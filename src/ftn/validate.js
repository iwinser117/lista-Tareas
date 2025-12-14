
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

  if(name.length < 3) {
    Swal.fire({
      title: "Nombre muy corto",
      text: "El Nombre debe tener al menos 3 caracteres",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }

  if(desc.length < 5) {
    Swal.fire({
      title: "Descripción muy corta",
      text: "La Descripción debe tener al menos 5 caracteres",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }

  if(name.length > 50) {
    Swal.fire({
      title: "Nombre muy largo",
      text: "El Nombre no debe exceder los 50 caracteres",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return false;
  }

  if(desc.length > 200) {
    Swal.fire({
      title: "Descripción muy larga",
      text: "La Descripción no debe exceder los 200 caracteres",
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
