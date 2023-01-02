// document.addEventListener("DOMContentLoaded", () => {
//   getDatos();
// });
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

const button = document.getElementById("button-form");
button.addEventListener("click", async (e) => {
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
