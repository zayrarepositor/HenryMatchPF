const express = require('express');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');

const router = express.Router();

router.get("/users",userGet);
router.post('/users', userPost);



module.exports = router;