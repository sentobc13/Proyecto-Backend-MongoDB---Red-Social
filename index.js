const express = require("express");
const { handleTypeError }= require('./middleware/errors');
const { dbConnection } = require("./config/config");
const app = express()
//require("dotenv").config()
const PORT = 3002

app.use(express.json())
dbConnection()
app.use("/users",require("./routes/users"));
app.use("/posts",require("./routes/posts"));
app.get("/myName", (req, res) => {
    res.send("My name is " + req.query.name);
  });
app.use(handleTypeError);
  
app.listen(PORT, ()=> console.log(`Servidor levantado en el puerto ${PORT}`));