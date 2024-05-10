const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');

router.post('/',PostController.create);
router.put('/id/:_id',PostController.update);
router.delete('/id/:_id',PostController.delete);
router.get('/title/:title',PostController.getPostByTitle);
router.get('/id/:_id',PostController.getById);

module.exports = router;

//HOLA