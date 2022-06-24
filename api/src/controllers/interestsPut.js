const interestsSchema = require("../models/interests");


const interestsPut = (req, res) =>{
    const {id} = req.params;
    const {name} = req.body
    interestsSchema
        .updateOne({_id:id},{ $set: {name}})
        .then(data => res.json(data))
        .catch((error) => res.json({message:error}));
}

module.exports = {
    interestsPut
};