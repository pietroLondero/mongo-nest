import { IsEmail, IsNotEmpty, IsString, Length, isNotEmpty, isString } from "class-validator";

export class CategorytDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}