import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'Laptop Gaming ASUS ROG', description: 'Nombre del producto' })
  @Prop({ required: true, trim: true })
  name: string;

  @ApiProperty({ example: 'Laptop gaming con RTX 4070, 16GB RAM, 1TB SSD', description: 'Descripción del producto' })
  @Prop({ required: true, trim: true })
  description: string;

  @ApiProperty({ example: 2499.99, description: 'Precio del producto' })
  @Prop({ required: true, min: 0 })
  price: number;

  @ApiProperty({ example: 'Electrónica', description: 'Categoría del producto' })
  @Prop({ required: true, trim: true })
  category: string;

  @ApiProperty({ example: 50, description: 'Stock disponible' })
  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de la imagen del producto' })
  @Prop({ default: '' })
  imageUrl: string;

  @ApiProperty({ example: true, description: 'Si el producto está activo' })
  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
