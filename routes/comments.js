const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middleware/authentication');
const router = express.Router()


router.post('/post/:postId',authentication, CommentController.create);
router.delete('/id/:_id',authentication, CommentController.delete);

module.exports = router;