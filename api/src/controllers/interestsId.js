const interestsSchema = require('../models/interests');


const interestsId = (req, res) => {
    const { id } = req.params;

    interestsSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
}






module.exports = {
    interestsId
};