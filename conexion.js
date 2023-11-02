const mysql = require("mysql2");
const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();
const port = 3000;

dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  database: process.env.DB_DATABASE , 
  user: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/guardar", async (req, res) => {
  const { NNombre, MMail } = req.body;

  console.log(NNombre)
  console.log(MMail)

  const conn = db;
  const sql = "INSERT INTO usuario (iduser, nombre, mail) VALUES (?, ?, ?)";
  const iduser = parseInt(Math.floor(Math.random() * Date.now()).toString().slice(0, 5)) 
  const resDB = await new Promise((resolve) => {
    conn.query(sql, [iduser, NNombre, MMail], (err, result) => {
      if (err) {
        conn.end();
        console.log(err)
        resolve("Hola" + err.message);
      } else {
        conn.end();
        resolve("Creado correctamente");
      }
    });
  });
  res.send({resDB});
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});