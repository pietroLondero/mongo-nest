import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategorytDto } from 'src/dto/create-category.dto';
import { Category } from 'src/schemas/category.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) {
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        console.log(id);
        const product = await this.categoriesService.findOne(id);
        if (!product) {
            throw new NotFoundException()
        }
        return product;
    }

    @Post()
    async create(@Body() product: CategorytDto): Promise<Category> {
        return await this.categoriesService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: CategorytDto): Promise<Category> {
        return await this.categoriesService.update(id, product);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.categoriesService.delete(id);
    }

    @Get(':id/products')
    async findAllProducts(@Param('id') id: string) {
        return await this.categoriesService.findAllProducts(id);
    }

}

