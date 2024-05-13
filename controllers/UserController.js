const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/keys");




const UserController = {
   
    async create(req, res) {
      try {
        const password = bcrypt.hashSync(req.body.password,10);
        const user = await User.create({...req.body,password,role:"user"});
        res.status(201).send({ message: "Usuario registrado con exito", user });
      } catch (error) {
        console.error(error);
        res.status(500).send(error)
      }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            if(!user){
                return res.status(400).send("correo o contraseña incorrectos");
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch){
                return res.status(400).send("correo o contraseña incorrectos");
            }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    
  };



module.exports = UserController;
  