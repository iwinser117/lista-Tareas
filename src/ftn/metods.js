import { getTareas, createTarea } from './api.js';
import { logEnv } from './env.js';
import { misDatos } from './listar.js';

// Log environment on load
logEnv();

document.addEventListener("DOMContentLoaded", () => {
  getDatos();
});
const actualizarBtn = document.getElementById("button-actualizar");
const buttonCrear = document.getElementById("button-form");
const inputName = document.getElementById("nameTarea");
const inputDescripcion = document.getElementById("descripcionTarea");

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
  /* .then((response) => response.json())
    .then((data) => {
       misDatos(data);
    }); */
};
getDatos();

buttonCrear.addEventListener("click", async (e) => {
  validateInput(inputName, inputDescripcion);
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
  const { deleteTarea } = await import('./api.js');
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
