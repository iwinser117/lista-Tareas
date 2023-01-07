document.addEventListener("DOMContentLoaded", () => {
  getDatos();
});
const actualizarBtn = document.getElementById("button-actualizar");
const buttonCrear = document.getElementById("button-form");
const inputName = document.getElementById("nameTarea");
const inputDescripcion = document.getElementById("descripcionTarea");

const getDatos = async () => {
  const response = await fetch("http://localhost:3000/api/tareas");
  const data = await response.json();
  misDatos(data);
  return data;
  /* .then((response) => response.json())
    .then((data) => {
       misDatos(data);
    }); */
};
getDatos();

buttonCrear.addEventListener("click", async (e) => {
  const name = inputName.value;
  const descripcion = inputDescripcion.value;
  const enviarDatos = () => {
    fetch("http://localhost:3000/api/tareas", {
      method: "POST",
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
  };
  enviarDatos();
  inputName.value = "";
  inputDescripcion.value = "";
});


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
