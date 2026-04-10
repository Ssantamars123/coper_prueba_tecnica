import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    
    if (isLoginMode) {
      success = await login({ email, password });
    } else {
      success = await register({ name, email, password });
    }

    if (success) {
      navigate('/products');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Croper App</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLoginMode ? 'Inicia sesión para continuar' : 'Crea una cuenta nueva'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label className="form-label">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                minLength={2}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Juan Pérez"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="juan@ejemplo.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              required 
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimo 6 caracteres"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}
            disabled={isLoading}
          >
            {isLoading 
              ? (isLoginMode ? 'Iniciando sesión...' : 'Registrando...') 
              : (isLoginMode ? 'Ingresar' : 'Crear Cuenta')}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
