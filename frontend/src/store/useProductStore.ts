import { create } from 'zustand';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import type { Product, CreateProductDto, UpdateProductDto } from '../api/products';
import toast from 'react-hot-toast';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  
  // Actions
  fetchProducts: (page?: number, limit?: number, search?: string, category?: string) => Promise<void>;
  addProduct: (product: CreateProductDto) => Promise<boolean>;
  editProduct: (id: string, product: UpdateProductDto) => Promise<boolean>;
  removeProduct: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 1,

  fetchProducts: async (page = 1, limit = 10, search = '', category = '') => {
    set({ isLoading: true, error: null });
    try {
      const response = await getProducts(page, limit, search, category);
      set({ 
        products: response.data, 
        total: response.total, 
        page: response.page, 
        totalPages: response.totalPages,
        isLoading: false 
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error fetching products';
      set({ error: Array.isArray(msg) ? msg[0] : msg, isLoading: false });
      toast.error('Error al cargar productos');
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      await createProduct(productData);
      // Reload current page after addition
      await get().fetchProducts(get().page);
      toast.success('Producto creado exitosamente');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error creating product';
      const errorMsg = Array.isArray(msg) ? msg[0] : msg;
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },

  editProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      await updateProduct(id, productData);
      // Reload current page after edit
      await get().fetchProducts(get().page);
      toast.success('Producto actualizado exitosamente');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error updating product';
      const errorMsg = Array.isArray(msg) ? msg[0] : msg;
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  },

  removeProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteProduct(id);
      // Determine if we need to go back a page (if we deleted the last item on current page)
      const state = get();
      const shouldGoBack = state.products.length === 1 && state.page > 1;
      const newPage = shouldGoBack ? state.page - 1 : state.page;
      
      await state.fetchProducts(newPage);
      toast.success('Producto eliminado exitosamente');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error deleting product';
      const errorMsg = Array.isArray(msg) ? msg[0] : msg;
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
      return false;
    }
  }
}));
