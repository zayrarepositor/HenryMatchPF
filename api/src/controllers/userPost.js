const userSchema = require('../models/user');


const userPost = (req, res) => {
    const user = userSchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
}






module.exports = {
    userPost
};