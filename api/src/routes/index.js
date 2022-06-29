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
const { userNickname } = require('../controllers/userNickname');



const router = express.Router();

router.get('/users/:nickname', userNickname);
router.get('/users', userGet);
router.post('/users', userPost);
router.put('/usersId/:id', userPut)
router.get('/usersId/:id', userId)
router.delete('/usersId/:id', userDelete);
router.post('/interests', interestsPost);
router.get('/interests', interestsGet);
router.put('/interests/:id', interestsPut);
router.get('/interests/:id', interestsId);
router.delete('/interests/:id', interestsDelete);





module.exports = router;
