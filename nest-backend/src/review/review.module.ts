import { Module } from '@nestjs/common';
import { ReviewController } from './interface/review.controller';
import { PrismaReviewRepository } from './infrastructure/db/prisma-review.repository';
import { PrismaModule } from 'src/shared/infrastructure/database/prisma.module';

import { IReviewRepository } from './application/repository/review.repository';
import { CreateReviewUseCase } from './application/use-cases/create-review.use-case';
import { GetReviewsByProductUseCase } from './application/use-cases/get-reviews-by-product.use-case';
import { GetReviewsByUserUseCase } from './application/use-cases/get-reviews-by-user.use-case';
import { GetAverageRatingUseCase } from './application/use-cases/get-average-rating.use-case';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: IReviewRepository,
            useClass: PrismaReviewRepository,
        },
        CreateReviewUseCase,
        GetReviewsByProductUseCase,
        GetReviewsByUserUseCase,
        GetAverageRatingUseCase,
    ],
    controllers: [ReviewController],
    exports: [IReviewRepository],
})
export class ReviewModule {}
