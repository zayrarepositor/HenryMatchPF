const interestsSchema = require("../models/interests");

const interestsDelete = (req, res) => {
    const { id } = req.params;
    interestsSchema
        .remove({ _id: id })
        .then(data => res.json(data))
        .catch(error => res.json({ message: error }))
}

module.exports = {
    interestsDelete
};