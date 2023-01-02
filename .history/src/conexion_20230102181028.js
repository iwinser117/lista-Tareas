const path = require("node:path");
const mongoose = require("mongoose");
const rutaTarea = require('./api/routes/routesTareas')
const express = require("express");
const port = process.env.PORT || 3000;
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', rutaTarea);
// app.use(express.static(path.join(__dirname, "./src/public")))
// app.use(express.static("./src/public"));
//mis rutas
app.get("/", (req, res) => {
  res.send("hola estamos conectados desde mongoose");
});
app.get('*'),(req, res)=>{
  res.status(404).send('Error no encontrada')
}

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("conectado a mongodb"))
  .catch((e) => console.log("error de conexión", e));
app.listen(port, () => {
  console.log("escuchando efectivamente" + port);
});


const express = require("express");
const router = express.Router();
const tareaSchema = require("../models/tareasModels");
const app = express();
app.use(express.json());

//obteniendo las tareas
router.get("/tareas", (req, res) => {
  tareaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//obtener una sola tarea por id
router.get("/tareas/:id", (req, res) => {
  const { id } = req.params;
  tareaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//eliminar tareas , se usa el id.
router.delete("/tareas/:id", (req, res) => {
  const { id } = req.params;
  tareaSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//creando una nueva
router.post("/tareas", (req, res) => {
  const tareas = tareaSchema(req.body);
  console.log({ body: req.body });
  tareas
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//actualizar tarea
router.put("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const { name, descripcion } = req.body;
  tareaSchema
    //muy importante colocar el guion al piso ya que este es el de la base de datos
    .updateOne({ _id: id }, { $set: { name, descripcion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  console.log({ id });
});

module.exports = router;
