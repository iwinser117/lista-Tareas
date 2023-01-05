const contenido = document.getElementById("contenido");
let idVariable = "";
async function misDatos(data) {
  contenido.innerHTML = "";
  await data.map((item, index) => {
    contenido.innerHTML += `
            <tr>
              <th class="index">${index + 1}</th>
              <td >${item.name}</td>
              <td>${item.descripcion}</td>
              <td>
                ${item.statusTarea ? "pendiente" : "hecho"}
              </td> 
              <td onclick ="deleteTask('${item._id}')">
                <button  id="eliminarBtn" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>

          ${
            item.statusTarea
              ? `<td onclick ="editar('${item._id}', '${item.name}','${item.descripcion}')">
                  <button   class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
              </td>`
              : null
          }
          `;
  });
}

function editar(id, n, d) {
  actualizarBtn.style
  idVariable = id;
  inputName.value = n;
  inputDescripcion.value = d;
}

const actualizarDatos = () => {
  const name = inputName.value;
  const descripcion = inputDescripcion.value;
  fetch(`http://localhost:3000/api/tareas/${idVariable}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      descripcion,
    }),
  })
    .then(console.log("Editado..."))
    .then(getDatos);

  inputName.value = null;
  inputDescripcion.value = null;
  idVariable = "";
};


