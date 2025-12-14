// Configuración de API y CORS proxy (solo cliente)
// Si el backend habilita CORS, puedes dejar CORS_PROXY vacío.
export const API_BASE = 'https://express-raily-demo-production.up.railway.app/api';
export const CORS_PROXY = 'https://cors.isomorphic-git.org/'; // Vacío '' si no quieres proxy

export const apiUrl = (path) => `${CORS_PROXY}${API_BASE}${path}`;
