import { getTareas, createTarea, deleteTarea } from './api.js';
import { logEnv } from './env.js';
import { misDatos, editar, actualizarDatos, actualizarStatus } from './listar.js';
import { validateInput } from './validate.js';
import { alertDelete } from './alertDelete.js';
import { initListar } from './listar.js';

// Log environment on load
logEnv();

// Elementos del DOM
const actualizarBtn = document.getElementById("button-actualizar");
const buttonCrear = document.getElementById("button-form");
const inputName = document.getElementById("nameTarea");
const inputDescripcion = document.getElementById("descripcionTarea");
const contenido = document.getElementById("contenido");

// Definir getDatos PRIMERO (antes de usarlo)
const getDatos = async () => {
  const result = await getTareas();
  
  if (!result.ok) {
    console.error('Error al cargar tareas:', result.error);
    Swal.fire({
      title: 'Error',
      text: `No se pudieron cargar las tareas: ${result.error}`,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return [];
  }

  const data = result.data;
  misDatos(data);
  return data;
};

// AHORA inyectar dependencias en listar.js
initListar({
  contenido,
  actualizarBtn,
  inputName,
  inputDescripcion,
  getDatos,
});

// Exponer funciones globales para onclick en HTML
window.editar = editar;
window.actualizarStatus = actualizarStatus;
window.deleteTask = deleteTask;
window.actualizarDatos = actualizarDatos;

document.addEventListener("DOMContentLoaded", () => {
  getDatos();
});
  /* .then((response) => response.json())
    .then((data) => {
       misDatos(data);
    }); */
getDatos();

buttonCrear.addEventListener("click", async (e) => {
  const isValid = validateInput(inputName, inputDescripcion);
  if (!isValid) return;
  
  const name = inputName.value;
  const descripcion = inputDescripcion.value;
  
  const enviarDatos = async () => {
    const result = await createTarea(name, descripcion);
    
    if (!result.ok) {
      Swal.fire({
        title: 'Error',
        text: `No se pudo crear la tarea: ${result.error}`,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    await getDatos();
  };
  
  enviarDatos();
  inputName.value = "";
  inputDescripcion.value = "";
  actualizarBtn.style.display = "none";
});

async function deleteTask(id, tarea) {
  const result = await deleteTarea(id);
  
  if (!result.ok) {
    Swal.fire({
      title: 'Error',
      text: `No se pudo eliminar la tarea: ${result.error}`,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }
  
  await getDatos();
  alertDelete(tarea);
}
