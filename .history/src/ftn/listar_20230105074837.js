const contenido = document.getElementById("contenido");

async function misDatos(data) {
  contenido.innerHTML = "";
  await data.map((item, index) => {
    // console.log(item._id)
    contenido.innerHTML += `
            <tr>
              <th class="index">${index + 1}</th>
              <td >${item.name}</td>
              <td>${item.descripcion}</td>
              <td>
                ${item.statusTarea ? "pendiente" : "hecho"}
              </td> 
              <td onclick ="deleteTask('${item._id}')"><button  id="eliminarBtn" class="btn btn-danger">
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
let idVariable = "";
function editar(id, n, d) {
  idVariable = id;
  console.log(id, n, d);
  inputName.value = n;
  inputDescripcion.value = d;

  // actualizarDatos();
}
console.log(idVariable);
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
    .then(console.log("creado con exito"))
    .then(getDatos);

  inputName.value = "";
  inputDescripcion.value = "";
  idVariable = "";
};

//funciona hasta aqui el editar , ya que cambia el btn

async function deleteTask(id) {
  const response = await fetch(`http://localhost:3000/api/tareas/${id}`, {
    method: "DELETE",
  }).then(getDatos);
  if (response) {
    console.log(`efectivo el delete de ${id}`);
  } else {
    console.log("error en el delete");
  }
}
