const Post = require("../models/Post");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create(req.body)
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
    




}



module.exports = PostController;