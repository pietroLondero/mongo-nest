import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product.schema';
import { CategoriesController } from './categories.controller';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Product.name, schema: ProductSchema }
  ])],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule { }
