const express = require('express');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { userPut } = require('../controllers/userPut');
const { userId } = require('../controllers/userId');


const router = express.Router();

router.get("/users",userGet);
router.post('/users', userPost);
router.put("/users/:id", userPut)
router.get('/users/:id',userId)








module.exports = router;