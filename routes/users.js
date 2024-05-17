const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const {authentication} = require('../middleware/authentication');


router.post('/', UserController.create);
router.post('/login',UserController.login);
router.delete('/logout',authentication,UserController.logout);
router.get('/id/:_id',authentication,UserController.getById);
router.get('/info',authentication,UserController.getInfo);

module.exports = router;