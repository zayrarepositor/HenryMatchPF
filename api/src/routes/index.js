const express = require('express');
const { userDelete } = require('../controllers/userDelete');
const { userGet } = require('../controllers/userGet');
const { userPost } = require('../controllers/userPost');
const { userPut } = require('../controllers/userPut');
const { interestsPost } = require('../controllers/interestPost');
const { interestsGet } = require('../controllers/interestsGet');
const { userId } = require('../controllers/userId');
const { interestsPut } = require('../controllers/interestsPut');
const { interestsId } = require('../controllers/interestsId');
const { interestsDelete } = require('../controllers/interestsDelete');



const router = express.Router();

router.get('/users', userGet);
router.post('/users', userPost);
router.put('/users/:id', userPut)
router.get('/users/:id', userId)
router.delete('/users/:id', userDelete);
router.post('/interests', interestsPost);
router.get('/interests', interestsGet);
router.put('/interests/:id', interestsPut);
router.get('/interests/:id', interestsId);
router.delete('/interests/:id', interestsDelete);





module.exports = router;