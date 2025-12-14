
export function alertDelete(taskName) {
  Swal.fire({
    title: "Eliminado",
    text: `Se ha eliminado la tarea ${taskName}`,
    icon: "warning",
    confirmButtonText: "Aceptar",
  });
}