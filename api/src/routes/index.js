const express = require('express');
const { userPost } = require('../controllers/userPost');

const router = express.Router();

router.post('/users', userPost)






module.exports = router;