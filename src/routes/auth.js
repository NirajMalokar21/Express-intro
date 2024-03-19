const { Router } = require('express');
const passport = require('passport');
const User = require('../database/schemas/User')
const { hashPassword, comparePassword } = require('../utils/helpers');
const { authRegistrationController } = require('../controllers/auth');

const router = Router();

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if(!email || !password) return res.send(400);

//     const userDB = await User.findOne( { email });
//     if(!userDB) return res.send(401);

//     const isValid = comparePassword(password, userDB.password);
//     if(isValid) {
//         console.log("Authentication successfull!")
//         req.session.user = userDB;
//         return res.send(200);
//     } else {
//         console.log("Authentication unsuccessfull!")
//         return res.send(401);
//     }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200);
})

router.post('/register', authRegistrationController)

router.get('/discord', passport.authenticate('discord'), (res, req) => {
    res.send(200);
})

router.get(
    '/discord/redirect', 
    passport.authenticate('discord'),
    (req, res) => {
        res.send(200);
    }
)

module.exports = router;