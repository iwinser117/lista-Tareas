const mongoose = require("mongoose");

//esto es opcional
/* const Schema = mongoose.Schema; */

const tareaSchema = mongoose.Schema({
  //y aqui arriba hago uso de esa linea 4
  name: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  statusTarea : {
    default : true,
    type: Boolean
  }
});
module.exports = mongoose.model("Tarea", tareaSchema);
