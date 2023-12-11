import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from '../dto/create-product.dto';
import { Product } from '../schemas/product.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {
    }

    @Get()
    async findAll() {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        console.log(id);
        const product = await this.productsService.findOne(id);
        if (!product) {
            throw new NotFoundException()
        }
        return product;
    }

    @Post()
    async create(@Body() product: ProductDto) {
        return await this.productsService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: ProductDto) {
        return await this.productsService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.productsService.delete(id);
    }

}
