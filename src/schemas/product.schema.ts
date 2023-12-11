import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

    @Prop({ default: false })
    inStock: boolean;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ default: false })
    hasDiscount: boolean;

    @Prop({ default: 0 })
    discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre<ProductDocument>(['updateOne', 'updateMany'], function (next) {
    this.set({ updatedAt: new Date() });
    next();
});