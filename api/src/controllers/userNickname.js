const userSchema = require('../models/user');


const userNickname = (req, res) =>{
    const {nickname}= req.params;

    userSchema
    .findOne({nickname:nickname})
    .then(data => res.json(data))
    .catch(error => res.json({messaje:error}))
}
module.exports = {
    userNickname
}