/**
 * API Service - Centraliza todas las llamadas a la API
 * Maneja errores, logging y retorna respuestas estructuradas
 * Fácil de testear y mantener
 */

import { getApiBase } from './env.js';

const API_BASE = getApiBase();

/**
 * Wrapper genérico para fetch con manejo de errores
 * @param {string} endpoint - ruta relativa (ej: '/tareas')
 * @param {object} options - opciones de fetch (method, body, headers)
 * @returns {Promise<{ok: boolean, data: any, error: string|null}>}
 */
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[API] Error ${response.status}: ${endpoint}`, data);
      return {
        ok: false,
        data: null,
        error: data?.message || `Error ${response.status}`,
        status: response.status,
      };
    }

    console.log(`[API] Success: ${options.method || 'GET'} ${endpoint}`);
    return {
      ok: true,
      data,
      error: null,
      status: response.status,
    };
  } catch (err) {
    console.error(`[API] Network error: ${endpoint}`, err);
    return {
      ok: false,
      data: null,
      error: err.message || 'Error de conexión',
      status: 0,
    };
  }
};

/**
 * GET - Obtener lista de tareas
 */
export const getTareas = () => fetchAPI('/tareas');

/**
 * POST - Crear nueva tarea
 */
export const createTarea = (nombre, descripcion) => {
  return fetchAPI('/tareas', {
    method: 'POST',
    body: JSON.stringify({ name: nombre, descripcion }),
  });
};

/**
 * DELETE - Eliminar tarea
 */
export const deleteTarea = (id) => {
  return fetchAPI(`/tareas/${id}`, { method: 'DELETE' });
};

/**
 * PATCH - Actualizar tarea (nombre y descripción)
 */
export const updateTarea = (id, nombre, descripcion) => {
  return fetchAPI(`/tareas/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: nombre, descripcion }),
  });
};

/**
 * PATCH - Actualizar estado de tarea
 */
export const updateTareaStatus = (id, statusTarea) => {
  return fetchAPI(`/tareas/${id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ statusTarea }),
  });
};
