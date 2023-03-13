const contenido = document.getElementById("contenido");
// let contImagen = document.getElementById('miImagenEspera')
// contImagen.innerHTML = '><img src="../assets/esperandoDatos.gif" '
let idVariable = "";
let stado;
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
                  ? `<button class="btn btn-info" onclick="actualizarStatus('${item._id}',${item.statusTarea})">
                  <i class="fa-regular fa-circle-check"></i> Pendiente
                </button>`
                  : `<button
                    class="btn btn-success"
                    onclick="actualizarStatus('${item._id}',${item.statusTarea})"
                  >
                    <i class="fa-regular fa-circle-check"></i> Hecho
                  </button>`
              }
                
              </td>
              ${
                item.statusTarea
                  ? `<td onclick ="editar('${item._id}', '${item.name}','${item.descripcion}')">
                  <button   class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
              </td>`
                  : `<td onclick ="editar('${item._id}', '${item.name}','${item.descripcion}')">
                  <button   class="btn btn-warning">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
              </td>`
              }
              <td onclick ="deleteTask('${item._id}', '${item.name}')">
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

const actualizarDatos = () => {
  const name = inputName.value;
  const descripcion = inputDescripcion.value;
  
  fetch(
    `https://express-raily-demo-production.up.railway.app/api/tareas/${idVariable}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        descripcion,
      }),
    }
  )
    .then(console.log("Editado..."))
    .then(getDatos)

  inputName.value = null;
  inputDescripcion.value = null;
  idVariable = "";
  actualizarBtn.style.display = "none";
};

function actualizarStatus(id, b) {
  idVariable = id;
  stado = b;
  let statusTarea = !stado;
  fetch(
    `https://express-raily-demo-production.up.railway.app/api/tareas/${idVariable}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        statusTarea,
      }),
    }
  )
    .then(console.log(`estado actualizado a ${statusTarea}`))
    .then(getDatos)
}
