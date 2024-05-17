const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create(
                { ...req.body, userId: req.user._id, postId: req.params.postId })
            await Post.findByIdAndUpdate(req.params.postId, { $push: { commentIds: comment._id } })
            res.status(201).send({ message: "Comentario creado con exito", comment });
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear tu comentario', error })
        }
    },
    async delete(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
            await Post.findByIdAndUpdate(comment.postId, { $pull:{ commentIds: comment._id}})
            res.send({ message: 'Comentario eliminado', comment })

        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al eliminar el comentario' })
        }

    },
};

module.exports = CommentController;


