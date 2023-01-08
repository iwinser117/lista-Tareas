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
    .updateOne({ _id: id }, { $set: { name, descripcion} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  console.log({ id });
});
//actualizar estado
router.patch("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const { statusTarea } = req.body;
  tareaSchema
    //muy importante colocar el guion al piso ya que este es el de la base de datos
    .updateOne({ _id: id }, { $set: { statusTarea } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  console.log({ id });
});

module.exports = router;
