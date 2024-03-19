const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers")

async function authRegistrationController(req, res) {
    const { password, email } = req.body;
    const userDB = await User.findOne({ email });
    if(userDB){
        res.status(400);
        res.send({ msg: 'User already exists!'});
    } else {
        const password = hashPassword(req.body.password);
        const newUser = await User.create({ password, email });
        res.send(201);
    }
}

module.exports = { authRegistrationController };