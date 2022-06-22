const express = require('express');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { interestsPost } = require('../controllers/interestPost');
const { interestsGet } = require('../controllers/interestsGet');

const router = express.Router();

router.get("/users", userGet);
router.post('/users', userPost);
router.post('/interests', interestsPost);
router.get('/interests', interestsGet);






module.exports = router;