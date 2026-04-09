import apiClient from './client';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export const getProducts = async (page = 1, limit = 10, search = '', category = '') => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (search) params.append('search', search);
  if (category) params.append('category', category);

  const { data } = await apiClient.get<PaginatedProducts>(`/products?${params.toString()}`);
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (productData: CreateProductDto) => {
  const { data } = await apiClient.post<Product>('/products', productData);
  return data;
};

export const updateProduct = async (id: string, productData: UpdateProductDto) => {
  const { data } = await apiClient.patch<Product>(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return data;
};
