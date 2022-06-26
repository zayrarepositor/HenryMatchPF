const userSchema = require("../models/user");


const userPut = (req, res) =>{
    const {id} = req.params;
<<<<<<< HEAD
    const {name, age, birthday, nickname, email, password, genderInt, gender, image, description, henryLevel} = req.body
=======
    const {name, age ,birthday, nickname, email, password, image, description, henryLevel} = req.body
>>>>>>> cc154f79e04170b3ac582cef928884acd6eb25f0
    userSchema
        .updateOne({_id:id},{ $set: {name, age, birthday, nickname, email, password, image, genderInt, gender, description, henryLevel}})
        .then(data => res.json(data))
        .catch((error) => res.json({message:error}));
}

module.exports = {
    userPut
};