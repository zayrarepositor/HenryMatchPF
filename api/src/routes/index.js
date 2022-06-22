const express = require('express');
const { userDelete } = require('../controllers/userDelete');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { userPut } = require('../controllers/userPut');
const { interestsPost } = require('../controllers/interestPost');
const { userId } = require('../controllers/userId');


const router = express.Router();

router.get("/users", userGet);
router.post('/users', userPost);
router.put("/users/:id", userPut);
router.delete("/users/:id", userDelete);
router.post('/interests', interestsPost);
router.get('/users/:id',userId)








module.exports = router;