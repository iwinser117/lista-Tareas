function validateInput(input) {
  if (input.value.trim() === "") {
    // The input is empty, so return false
    Swal.fire({
      title: "Faltan datos",
      text: "Proporcione un Nombre y una breve Descripción a su Tarea",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }else {
    Swal.fire({
      title: "creado con exito",
      text: `Tarea : ${inputName.value}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }
//   return true;
}
