import { IsEmail, IsNotEmpty, IsString, Length, isNotEmpty, isString } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    category: string;

    inStock: boolean;

    hasDiscount: boolean;

    discount: number;
}