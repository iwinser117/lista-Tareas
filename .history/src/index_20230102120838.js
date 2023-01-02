document.addEventListener("DOMContentLoaded", () => {
  getDatos();
});

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
