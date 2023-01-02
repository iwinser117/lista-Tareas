const path = require("node:path");
const mongoose = require("mongoose");
const rutaTarea = require('./api/routes/routesTareas')
const express = require("express");
const port = process.env.PORT || 3000;
require("dotenv").config();
const routes = require
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


