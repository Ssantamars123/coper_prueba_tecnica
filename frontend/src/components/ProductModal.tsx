import { useState, useEffect } from 'react';
import type { CreateProductDto, Product, UpdateProductDto } from '../api/products';

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const ProductModal = ({ product, onClose, onSave, isLoading }: ProductModalProps) => {
  const [formData, setFormData] = useState<CreateProductDto | UpdateProductDto>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: '',
    isActive: true
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageUrl: product.imageUrl || '',
        isActive: product.isActive
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2 className="modal-title">{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
          </div>
          
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Nombre del Producto</label>
              <input required type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea required name="description" className="form-control" rows={3} value={formData.description} onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Precio ($)</label>
                <input required type="number" min="0" step="0.01" name="price" className="form-control" value={formData.price} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Stock</label>
                <input required type="number" min="0" name="stock" className="form-control" value={formData.stock} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Categoría</label>
              <input required type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
            </div>

            {product && (
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="isActive" id="isActive" checked={(formData as UpdateProductDto).isActive} onChange={handleChange} />
                <label htmlFor="isActive" style={{ margin: 0, cursor: 'pointer', color: 'var(--text-active)' }}>Producto Activo</label>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isLoading}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
