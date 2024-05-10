const express = require("express");
const { dbConnection } = require("./config/config");
const app = express()
const PORT = 3002

dbConnection()

app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));