import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { ProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return await this.productModel.findById(id).populate('category').exec();
    }

    async create(product: ProductDto): Promise<Product> {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async update(id: string, product: ProductDto): Promise<Product> {
        this.productModel.updateOne({ _id: id }, product);
        return await this.productModel.findById(id);
    }

    async delete(id: string): Promise<any> {
        return await this.productModel.findByIdAndDelete(id);
    }
}
