import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Patch, BadRequestException, NotFoundException } from "@nestjs/common";
import { GetProductUseCase } from "../application/use-cases/getProduct/deleteProduct.use-case";
import { AddProductUseCase } from "../application/use-cases/addProduct/addProduct.use-case";
import { DeleteProductUseCase } from "../application/use-cases/deleteProduct/deleteProduct.use-case";
import { UpdateProductUseCase } from "../application/use-cases/updateProduct/updateProduct.use-case";
import { GetAllProductsUseCase } from "../application/use-cases/getAllProducts/getAllProducts.use-case";
import { SessionAuthGuard } from "src/auth/interfaces/guards/session.guard";
import { RolesGuard } from "src/auth/interfaces/guards/roles.guard";
import { Roles } from "src/auth/interfaces/decorators/roles.decorator";
import { ApiBody, ApiOperation, ApiProperty, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ResponseGetProduct } from "./dto/response/getProduct";
import { CreateProductResponse } from "./dto/response/createProduct.response";
import { GetAllProductsPaginatedResponse } from "./dto/response/getAllProducts.response";
import { CreateProductDto, UpdateProductDto } from "./dto/request/createProduct.dto";
import { Product } from "../domain/product.agregate";
import { GetFilterQuery } from "./dto/request/getFilterQuery";
import { Role } from "src/compte/domain/value-object/role.value-object";
@Controller("products")
@UseGuards(SessionAuthGuard)
export class ProductController {

    constructor(
        private readonly getProductUseCases: GetProductUseCase,
        private readonly postProductUseCase: AddProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
        private readonly getAllProductsUseCase: GetAllProductsUseCase
    ) { }

    @ApiOperation({ summary: "Récupère tous les produits avec pagination et filtrage par catégorie" })
    @ApiQuery({ type: GetFilterQuery, description: 'Filtrer par ID de catégorie' })
    @ApiResponse({ status: 200, description: "Liste des produits paginée", type: Promise<GetAllProductsPaginatedResponse> })
    @Get()
    async getAllProducts(@Query() filterQuery: GetFilterQuery): Promise<GetAllProductsPaginatedResponse> {
        const pageNum = filterQuery.page ? parseInt(filterQuery.page) : 1;
        const limitNum = filterQuery.limit ? parseInt(filterQuery.limit) : 10;
        const categoryIdNum = filterQuery.categoryId ? parseInt(filterQuery.categoryId) : undefined;

        const result = await this.getAllProductsUseCase.execute({
            page: pageNum,
            limit: limitNum,
            categoryId: categoryIdNum
        });

        return {
            data: result.items.map(product => ({
                id: product.getId()!,
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice().toDecimal(),
                stock: product.getStock()!,
                category: {
                    id: product.getCategory().getId(),
                    name: product.getCategory().getName(),
                    description: product.getCategory().getDescription()
                }
            })),
            total: result.items.length,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages
        };
    }

    @ApiOperation({ summary: "Récupère un produit par son ID" })
    @ApiResponse({ status: 200, description: "Récupère un produit par son ID", type: Promise<ResponseGetProduct> })
    @Get(':id')
    async getProducts(@Param('id') id: string): Promise<ResponseGetProduct> {
        const product = await this.getProductUseCases.execute({
            id: parseInt(id)
        });

        return {
            id: product.getId()!,
            description: product.getDescription(),
            name: product.getName(),
            price: product.getPrice().toDecimal(),
            stock: product.getStock()!,
            reviews: product.getReviews().map(review => ({
                id: review.getId()!,
                rating: review.getRating().getValue(),
                comment: review.getComment().getContent(),
            })),
            category: {
                id: product.getCategory().getId(),
                name: product.getCategory().getName(),
                description: product.getCategory().getDescription()
            }
        };
    }

    @ApiOperation({ summary: "Créer un produit (ADMIN uniquement)" })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: "Produit créé avec succès", type: Promise<CreateProductResponse> })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    async addProduct(@Body() body: CreateProductDto): Promise<CreateProductResponse> {
        try {
            const product = await this.postProductUseCase.execute({
                name: body.name,
                description: body.description,
                price: body.price,
                categoryId: body.categoryId,
                stock: body.stock || 0
            });

            return {
                id: product.getId()!,
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice().getAmount(),
                stock: product.getStock()!
            };
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }

    @ApiOperation({ summary: "Mettre à jour un produit (ADMIN uniquement)" })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: "Produit mis à jour avec succès", type: Promise<Product> })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<CreateProductResponse> {
        const productId = parseInt(id);

        if (isNaN(productId)) {
            throw new BadRequestException('ID du produit invalide');
        }

        const product = await this.updateProductUseCase.execute({
            id: productId,
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock
        });

        return {
            id: product.getId()!,
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice().getAmount(),
            stock: product.getStock()!
        };

    }

    @ApiOperation({ summary: "Supprimer un produit (ADMIN uniquement)" })
    @ApiResponse({ status: 204, description: "Produit supprimé avec succès" })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        const productId = parseInt(id);

        if (isNaN(productId)) {
            throw new BadRequestException('ID du produit invalide');
        }

        await this.deleteProductUseCase.execute({ id: productId });
        
    }
}