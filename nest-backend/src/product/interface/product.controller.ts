import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Patch, BadRequestException, NotFoundException } from "@nestjs/common";
import { GetProductUseCase } from "../application/use-cases/getProduct/deleteProduct.use-case";
import { AddProductUseCase } from "../application/use-cases/addProduct/addProduct.use-case";
import { DeleteProductUseCase } from "../application/use-cases/deleteProduct/deleteProduct.use-case";
import { UpdateProductUseCase } from "../application/use-cases/updateProduct/updateProduct.use-case";
import { SessionAuthGuard } from "src/auth/interfaces/guards/session.guard";
import { ApiOperation, ApiProperty, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { RequestLoginDto } from "src/auth/interfaces/requestDto/login.dto";
import { ResponseGetProduct } from "./dto/response/getProduct";
import { CreateProductResponse } from "./dto/response/createProduct.response";
import { CreateProductDto, UpdateProductDto } from "./dto/request/createProduct.dto";
import { Product } from "../domain/product.agregate";

@Controller("products")
@UseGuards(SessionAuthGuard)
export class ProductController {

    constructor(
        private readonly getProductUseCases: GetProductUseCase,
        private readonly postProductUseCase: AddProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
    ) { }

    @ApiOperation({ summary: "Récupère un produit par son ID" })
    @ApiResponse({ status: 200, description: "Récupère un produit par son ID", type: Promise<ResponseGetProduct> })
    @Get(':id')
    async getProducts(@Param('id') id: number): Promise<ResponseGetProduct> {
        const product = await this.getProductUseCases.execute({
            id
        });

        return {
            id: product.getId()!,
            description: product.getDescription(),
            name: product.getName(),
            price: product.getPrice().getAmount(),
            stock: product.getStock()!,
            reviews: product.getReviews().map(review => ({
                id: review.getId()!,
                rating: review.getRating().getValue(),
                comment: review.getComment().getContent(),
            }))
        };
    }

    @ApiOperation({ summary: "Créer un produit" })
    @ApiResponse({ status: 201, description: "Produit créé avec succès", type: Promise<CreateProductResponse> })
    @Post()
    async addProduct(@Body() body: CreateProductDto): Promise<CreateProductResponse> {
        try {
            const product = await this.postProductUseCase.execute({
                name: body.name,
                description: body.description,
                price: body.price,
                categoryId: 1, // À adapter selon votre logique
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

    @ApiOperation({ summary: "Mettre à jour un produit" })
    @ApiResponse({ status: 200, description: "Produit mis à jour avec succès", type: Promise<Product> })
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

    @ApiOperation({ summary: "Supprimer un produit" })
    @ApiResponse({ status: 204, description: "Produit supprimé avec succès" })
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        const productId = parseInt(id);

        if (isNaN(productId)) {
            throw new BadRequestException('ID du produit invalide');
        }

        await this.deleteProductUseCase.execute({ id: productId });
        
    }
}