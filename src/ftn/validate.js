
export function validateInput(inputName, inputDesc) {
  const name = (inputName?.value || "").trim();
  const desc = (inputDesc?.value || "").trim();

  if (!name || !desc) {
    Swal.fire({
      title: "Faltan datos",
      text: "Proporcione un Nombre y una breve Descripción a su Tarea",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }

  Swal.fire({
    title: "Creado con éxito",
    text: `Tarea: ${name}`,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
  return true;
}
