import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { CategorytDto } from 'src/dto/create-category.dto';

import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<Category> {
        return await this.categoryModel.findById(id);
    }

    async create(category: CategorytDto): Promise<Category> {
        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }

    async update(id: string, category: CategorytDto): Promise<Category> {
        this.categoryModel.updateOne({ _id: id }, category);
        return await this.categoryModel.findById(id);
    }

    async findAllProducts(id: string): Promise<Product[]> {
        return await this.productModel.find({ category: id });
    }

    async delete(id: string): Promise<any> {
        return await this.categoryModel.findByIdAndDelete(id);
    }
}
