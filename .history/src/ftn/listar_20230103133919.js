const contenido = document.getElementById("contenido");
const nombreTarea = document.getElementById("nDBtarea");
let obtenerDato = document.getElementsByTagName("td");

console.log(obtenerDato);

async function misDatos(data) {
  contenido.innerHTML = "";
  await data.map((item, index) => {
    // console.log(item._id)
    contenido.innerHTML += `
            <tr>
              <th id="miItemActual"  scope="row">${index + 1}</th>
              
              <td id="nDBtarea">${item.name}</td>
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
        `;
  });
}

async function deleteTask(id) {
  console.log(id);
  const response = await fetch(`http://localhost:3000/api/tareas/${id}`, {
    method: "DELETE",
  }).then(getDatos);
  if (response) {
    console.log("efectivo el delete");
  } else {
    console.log("error en el delete");
  }
}
