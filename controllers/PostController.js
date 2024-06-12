const Post = require("../models/Post");
const User = require("../models/User");
const axios = require('axios');

const PostController = {
    async create(req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).send({ message: "Por favor rellene el titulo" });
            } else if (!req.body.body) {
                return res.status(400).send({ message: "Por favor rellene el body" });
            }

            // Obtener una imagen aleatoria de Lorem Picsum
            const response = await axios.get('https://picsum.photos/200');
            const imageUrl = response.request.res.responseUrl; // URL de la imagen aleatoria

            const post = await Post.create({ ...req.body, userId: req.user._id, imageUrl });
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: post._id } });
            res.status(201).send({ message: "Post creado con exito", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al crear el post' });
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
            res.status(200).send({ message: "Post actualizado con éxito", post });
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            res.send({ message: 'Post eliminado', post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al eliminar el post' });
        }
    },
    async getPostByTitle(req, res) {
        try {
            if (req.params.title.length > 20) {
                return res.status(400).send('Búsqueda demasiado larga');
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
                .populate({
                    path: 'commentIds',
                    populate: {
                        path: 'userId',
                        select: 'name'
                    }
                });
            res.send(post);
        } catch (error) {
            console.error(error);
        }
    },
    async getAll(req, res) {
        try {
          // const { page = 1, limit = 10 } = req.query;
          const post = await Post.find()
            // .limit(limit)
            // .skip((page - 1) * limit);
          res.send(post);
        } catch (error) {
            console.error(error);
        }
      },
      async insertComment(req, res) {
        try {
            const { comment } = req.body;
            const userId = req.user._id;
            const postId = req.params._id;

            
    
            // Crear un nuevo comentario
            const newComment = await Comment.create({ comment, userId, postId });
    
            // Actualizar el post con el nuevo comentario
            const post = await Post.findByIdAndUpdate(
                postId,
                { $push: { commentIds: newComment._id } },
                { new: true }
            ).populate({
                path: 'commentIds',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            });
    
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al agregar comentario");
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
            res.send({ message: "Like dado con éxito", post });
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
            res.send({ message: "Like quitado con éxito", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al quitar el like" });
        }
    },
    async dislike(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { dislikes: req.user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.user._id,
                { new: true }
            );
            res.send({ message: "Dislike dado con éxito", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema con tu dislike" });
        }
    },
    async notDislike(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $pull: { dislikes: req.user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.user._id,
                { new: true }
            );
            res.send({ message: "Dislike quitado con éxito", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Ha habido un problema al quitar el like" });
        }
    },
};

module.exports = PostController;
