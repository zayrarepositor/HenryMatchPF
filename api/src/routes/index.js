const express = require('express');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { userId } = require('../controllers/userId');

const router = express.Router();

router.get("/users",userGet);
router.post('/users', userPost);
router.get('/users/:id',userId)







module.exports = router;