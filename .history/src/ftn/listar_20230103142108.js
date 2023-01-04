const contenido = document.getElementById("contenido");
const nombreTarea = document.getElementById("nDBtarea");

async function misDatos(data) {
  contenido.innerHTML = "";
  await data.map((item, index) => {
    // console.log(item._id)
    contenido.innerHTML += `
            <tr>
              <th  scope="row">${index + 1}</th>
              
              <td >${item.name}</td>
              <td>${item.descripcion}</td>
              <td>
                <select class="form-select" aria-label="Default select example">
                  <option selected>${
                    item.statusTarea ? "pendiente" : "hecho"
                  }</option>
                  <option value="1">Hecho</option>
                </select>
              </td> 
              <td onclick ="deleteTask('${
                item._id
              }')"><button  id="eliminarBtn" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button></td>

          {item.statusTarea ? }
          <td><button  id="eliminar" class="btn btn-warning">
            <i class="fa-regular fa-pen-to-square"></i>
          </button></td>
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
