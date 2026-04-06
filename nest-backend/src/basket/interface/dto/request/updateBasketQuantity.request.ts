import { IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateBasketQuantityRequestDto {
  @IsNumber()
  @IsPositive()
  productId!: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity!: number;
}
