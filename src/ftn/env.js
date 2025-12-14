/**
 * Environment detection and configuration
 * Soporta desarrollo local (localhost:3000) y producción (URL remota)
 */

const isDev = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
};

const API_BASE_DEV = 'http://localhost:3000/api';
const API_BASE_PROD = 'https://express-raily-demo-production.up.railway.app/api';

export const getApiBase = () => {
  return isDev() ? API_BASE_DEV : API_BASE_PROD;
};

export const isProduction = () => !isDev();

export const logEnv = () => {
  console.log(`[ENV] Environment: ${isDev() ? 'DEVELOPMENT' : 'PRODUCTION'}`);
  console.log(`[ENV] API Base: ${getApiBase()}`);
};
