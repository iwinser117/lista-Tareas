function alertDelete (a){
    Swal.fire({
      title: "Eliminado",
      text: `Se ha eliminado la tarea ${a}`,
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
}