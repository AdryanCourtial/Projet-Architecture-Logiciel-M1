import { Module } from '@nestjs/common';
import { ReviewController } from './interface/review.controller';
import { PrismaReviewRepository } from './infrastructure/db/prisma-review.repository';
import { PrismaModule } from 'src/shared/infrastructure/database/prisma.module';

import {
    CreateReviewUseCase,
    GetReviewsByProductUseCase,
    GetReviewsByUserUseCase,
    GetAverageRatingUseCase,
} from './application/use-cases';
import { IReviewRepository } from './application/repository/review.repository';

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
