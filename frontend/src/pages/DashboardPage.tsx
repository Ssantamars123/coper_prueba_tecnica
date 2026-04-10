import { useEffect, useMemo } from 'react';
import { useProductStore } from '../store/useProductStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell
} from 'recharts';

export const DashboardPage = () => {
  const { products, fetchProducts, isLoading } = useProductStore();

  // Load products if we haven't already
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Aggregate categories data natively
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      const category = p.category || 'General';
      counts[category] = (counts[category] || 0) + 1;
    });

    // Convert map to array { name: string, value: number }
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Sort descending
  }, [products]);

  const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6', '#10b981'];

  return (
    <div style={{ maxWidth: '1200px', padding: '1rem', width: '100%', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: 700, fontSize: '2rem' }}>
        Dashboard de Inventario
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Resumen general y métricas de tus productos por categoría.
      </p>

      {isLoading && products.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando métricas...</div>
      ) : (
        <div className="card" style={{ padding: '2rem', height: '450px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
            Distribución por Categorías
          </h2>
          
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 13 }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 13 }} 
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: 'var(--background)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              No hay suficientes datos para graficar. Añade productos para comenzar.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
