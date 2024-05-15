const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const {authentication} = require ('../middleware/authentication')

router.post('/',authentication,PostController.create);
router.put('/id/:_id',authentication,PostController.update);
router.delete('/id/:_id',authentication,PostController.delete);
router.get('/title/:title',authentication,PostController.getPostByTitle);
router.get('/id/:_id',authentication,PostController.getById);
router.get('/',authentication,PostController.getAll);
router.put('/comment/:_id',authentication,PostController.insertComment);
router.put('/like/:_id', authentication, PostController.like);
router.put('/notlike/:_id', authentication, PostController.notLike);

module.exports = router;

//HOLA