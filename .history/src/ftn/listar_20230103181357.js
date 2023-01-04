const contenido = document.getElementById("contenido");
const nombreTarea = document.getElementById("nDBtarea");
const ind = document.getElementsByClassName('index')

// let elementosFila = obtenerFila.getElementsByTagName("td");
console.log(ind.value)
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
              <td onclick ="deleteTask('${
                item._id
              }')"><button  id="eliminarBtn" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button></td>

          ${
            item.statusTarea
              ? `<td ${item._id}>
            <button   class="btn btn-warning">
            <i class="fa-regular fa-pen-to-square"></i>
             </button>
          </td>`
              : null
          }
          
        `;
  });
}

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

document.getElementById("miapp").addEventListener("click", function (event) {
  event.preventDefault();
});
