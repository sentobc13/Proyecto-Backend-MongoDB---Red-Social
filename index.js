const express = require("express");
const { dbConnection } = require("./config/config");
const app = express()
const PORT = 3002

app.use(express.json())
dbConnection()
app.use("/posts",require("./routes/posts"))
  
app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));