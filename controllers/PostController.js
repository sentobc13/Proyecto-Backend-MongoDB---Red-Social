const Post = require("../models/Post");
const User = require("../models/User");

const PostController = {
    async create(req, res) {
        try {
            if(!req.body.title){
                return res.status(400).send({message:"Por favor rellene el titulo"})
            }else if(!req.body.body){
                return res.status(400).send({message:"Por favor rellene el body"})
            }
            const post = await Post.create(req.body)
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: post._id }})
            res.status(201).send({ message: "Post creado con exito", post });
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "Post actualizado con éxito", post });
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ message: 'Post eliminado', post })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al eliminar el post' })
        }

    },
    async getPostByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga')
            }
            const title = new RegExp(req.params.title, "i");
            const post = await Post.find({ title });
            res.send(post);
        } catch (error) {
            console.log(error);
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async getAll(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const post = await Post.find()
            .limit(limit)
            .skip((page - 1) * limit);
          res.send(post);
        } catch (error) {
          console.error(error);
        }
      },
    async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { comments: { comment:req.body.comment, userId: req.user._id } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un problema con tu comentario" });
        }
      },
      async like(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { likes: req.user._id } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            req.user._id,
            { $push: { wishList: req.params._id } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un problema con tu like" });
        }
      },
      async notLike(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $pull: { likes: req.user._id } },
            { new: true }
          );
          await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishList: req.params._id } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un problema al quitar el like" });
        }
      },
      

    
    




}



module.exports = PostController;