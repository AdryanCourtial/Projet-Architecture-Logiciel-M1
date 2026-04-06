import { IsNumber, IsPositive, Min } from 'class-validator';

export class AddToBasketRequestDto {
  @IsNumber()
  @IsPositive()
  productId!: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity!: number;
  
}
