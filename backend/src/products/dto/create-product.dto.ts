import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Gaming ASUS ROG', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({ example: 'Laptop gaming con RTX 4070, 16GB RAM', description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description: string;

  @ApiProperty({ example: 2499.99, description: 'Precio del producto' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  @ApiProperty({ example: 'Electrónica', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres' })
  category: string;

  @ApiProperty({ example: 50, description: 'Stock disponible' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de la imagen', required: false })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  imageUrl?: string;
}
