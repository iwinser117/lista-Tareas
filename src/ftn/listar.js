import { updateTarea, updateTareaStatus } from './api.js';

let idVariable = "";
let stado;
let contenido, actualizarBtn, inputName, inputDescripcion, getDatos;

// Setter para inyectar dependencias de metods.js
export function initListar(deps) {
  contenido = deps.contenido;
  actualizarBtn = deps.actualizarBtn;
  inputName = deps.inputName;
  inputDescripcion = deps.inputDescripcion;
  getDatos = deps.getDatos;
}

async function misDatos(data) {
  contenido.innerHTML = "";
  await data.map((item, index) => {
    contenido.innerHTML += `${
      item
        ? `
    
            <tr ${
              item.statusTarea ? null : `class="text-decoration-line-through"`
            }>
              <th class="index">${index + 1}</th>
              <td >${item.name}</td>
              <td > ${item.descripcion}</td>
              <td>${
                item.statusTarea
                  ? `<button class="btn btn-info" onclick="window.actualizarStatus('${item._id}',${item.statusTarea})">
                  <i class="fa-regular fa-circle-check"></i> Pendiente
                </button>`
                  : `<button
                    class="btn btn-success"
                    onclick="window.actualizarStatus('${item._id}',${item.statusTarea})"
                  >
                    <i class="fa-regular fa-circle-check"></i> Hecho
                  </button>`
              }
                
              </td>
              ${
                item.statusTarea
                  ? `<td onclick ="window.editar('${item._id}', '${item.name}','${item.descripcion}')">
                  <button   class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
              </td>`
                  : `<td onclick ="window.editar('${item._id}', '${item.name}','${item.descripcion}')">
                  <button   class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
              </td>`
              }
              <td onclick ="window.deleteTask('${item._id}', '${item.name}')">
                <button  id="eliminarBtn" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>`
        : "<div><img src='../assets/esperandoDatos.gif'></div>"
    }`;
  });
}

function editar(id, n, d) {
  actualizarBtn.style.display = "inline";
  idVariable = id;
  inputName.value = n;
  inputDescripcion.value = d;
}

const actualizarDatos = async () => {
  const name = inputName.value;
  const descripcion = inputDescripcion.value;
  
  const result = await updateTarea(idVariable, name, descripcion);
  
  if (!result.ok) {
    Swal.fire({
      title: 'Error',
      text: `No se pudo actualizar la tarea: ${result.error}`,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  console.log("Tarea actualizada con éxito");
  await getDatos();
  
  inputName.value = null;
  inputDescripcion.value = null;
  idVariable = "";
  const actualizarBtn = document.getElementById("button-actualizar");
  if (actualizarBtn) actualizarBtn.style.display = "none";
};

function actualizarStatus(id, b) {
  idVariable = id;
  stado = b;
  let statusTarea = !stado;
  
  updateTareaStatus(idVariable, statusTarea)
    .then(async (result) => {
      if (!result.ok) {
        Swal.fire({
          title: 'Error',
          text: `No se pudo actualizar el estado: ${result.error}`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
      console.log(`Estado actualizado a ${statusTarea}`);
      await getDatos();
    });
}

export { misDatos, editar, actualizarDatos, actualizarStatus };
