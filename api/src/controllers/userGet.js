const userSchema = require("../models/user")


const userGet = (req, res) =>{
    const {name} = req.query;

    if(name){
        userSchema
        .find({name:name})
        .then((data) => res.json(data))
        .catch(error => res. json({message: error,msj:"name"}))
    }
    else{
        userSchema
        .find()
        .then( data => res.json(data))
        .catch( error => res. json({message: error,msj:"else"}));

    }
}



module.exports = {
    userGet
};
