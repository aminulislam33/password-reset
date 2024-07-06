const {User} = require('../models/user');

async function handlerUserSignUp(req,res){
    const {name, email, password} = req.body;
    const userFind = await User.findOne({email});
    if(userFind){
        res.json("Email is already registered")
    }
    try {
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(200).json({
            message: "Registration successful",
            user: user
        });
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    handlerUserSignUp,
}