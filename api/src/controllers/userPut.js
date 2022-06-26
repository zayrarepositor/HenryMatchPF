const userSchema = require("../models/user");


const userPut = (req, res) =>{
    const {id} = req.params;
    const {name, age, birthday, nickname,premium,active, email, image, genderInt, gender, description, henryLevel, likeRecieved, likeGiven, matches} = req.body

    userSchema
        .updateOne({_id:id},{ $set: {name, age, birthday, nickname,premium,active, email, image, genderInt, gender, description, henryLevel, likeRecieved, likeGiven, matches}})
        .then(data => res.json(data))
        .catch((error) => res.json({message:error}));
}

module.exports = {
    userPut
};