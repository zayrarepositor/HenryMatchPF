

/* const Users = require('../models/user')
const userPut = async (req, res) => {
    const { name, age, birthday, nickname, email, password, genderInt, gender, image, description, henryLevel } = req.body
    try {
        const updatedUser = await Users.findByIdAndUpdate(id, {
            name, age, birthday, nickname, email, password, genderInt, gender, image, description, henryLevel
        })
        console.log(updatedUser,'UPDATEUSER')
        res.send(updatedUser)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
} 
 */

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


/* const userPut = (req, res) =>{
    const {id} = req.params;

    const {name, age, birthday, nickname, email, password, genderInt, gender, image, description, henryLevel} = req.body

    userSchema
        .updateOne({_id:id},{ $set: {name, age, birthday, nickname, email, password, image, genderInt, gender, description, henryLevel}})
        .then(data => res.json(data))
        .catch((error) => res.json({message:error}));
} 
 */
