import type { Product } from '../api/products';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductsTable = ({ products, isLoading, onEdit, onDelete }: ProductsTableProps) => {
  if (isLoading && products.length === 0) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="card table-responsive">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div style={{ fontWeight: 500 }}>{product.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.description}
                </div>
              </td>
              <td>{product.category}</td>
              <td style={{ fontWeight: 500 }}>${product.price.toFixed(2)}</td>
              <td>
                <span style={{ color: product.stock === 0 ? 'var(--danger)' : 'inherit' }}>
                  {product.stock}
                </span>
              </td>
              <td>
                <span className={`status-badge ${product.isActive ? 'status-active' : 'status-inactive'}`}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline" onClick={() => onEdit(product)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                      onDelete(product._id);
                    }
                  }}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
