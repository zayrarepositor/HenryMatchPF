const express = require('express');
const { userDelete } = require('../controllers/userDelete');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { userPut } = require('../controllers/userPut');

const router = express.Router();

router.get("/users",userGet);
router.post('/users', userPost);
router.put("/users/:id", userPut);
router.delete("/users/:id", userDelete);






module.exports = router;