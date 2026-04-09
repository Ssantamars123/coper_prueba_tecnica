import { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { ProductsTable } from '../components/ProductsTable';
import { ProductModal } from '../components/ProductModal';
import type { Product } from '../api/products';

export const ProductsPage = () => {
  const { products, isLoading, totalPages, page, fetchProducts, removeProduct, addProduct, editProduct } = useProductStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Search logic (Client side debounce mapping to store)
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Initial fetch
    fetchProducts(1);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(1, 10, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage, 10, searchTerm);
    }
  };

  const handleOpenNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await removeProduct(id);
  };

  const handleSaveModal = async (data: any) => {
    let success = false;
    if (editingProduct) {
      success = await editProduct(editingProduct._id, data);
    } else {
      success = await addProduct(data);
    }
    
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-active)' }}>Inventario de Productos</h1>
          <p style={{ color: 'var(--text-muted)' }}>Gestiona los artículos de la tienda</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenNew}>
          + Agregar Producto
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Buscar por nombre o descripción..." 
          style={{ maxWidth: '400px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ProductsTable 
        products={products} 
        isLoading={isLoading} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      {totalPages > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Mostrando página {page} de {totalPages}
          </div>
          <div className="pagination-controls">
            <button 
              className="btn btn-outline" 
              disabled={page === 1 || isLoading} 
              onClick={() => handlePageChange(page - 1)}
            >
              Anterior
            </button>
            <button 
              className="btn btn-outline" 
              disabled={page === totalPages || isLoading} 
              onClick={() => handlePageChange(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveModal}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
