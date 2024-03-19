const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

// DONE ***********************************************************
// There are 3 parameters
// it goes to the next middleware
// First parameter is error, second is user

// You gotta serialise the user into the session
// Data deserializer will be called after a GET request
// Make sure you only call these once if you have multiple options

passport.serializeUser((user, done) => {
    console.log("Serialising User...");
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log("Deserialising User...");
    console.log(id);
    try{
        const user = await User.findById(id);
        if(!user) throw new Error('User not found');
        console.log(user);
        done(null, user);
    } catch (err){
        console.log(err)
    }
})

passport.use(
    new Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        console.log(email);
        console.log(password);

        try {
            // Check if the credentials are provided
            if(!email || !password) throw new Error('Missing Credentials');

            // Check if the user exists in the DB
            const userDB = await User.findOne({ email });
            if(!userDB) throw new Error('User not found!');
            
            // Compare passwords for the user and the DB
            const isValid = comparePassword(password, userDB.password);
            
            // Return the user if the passwords match
            if(isValid){
                console.log("Authentication Successful!")
                done(null, userDB);
            } else {
                console.log("Invalid Authentication");
                done(null, null);
            }
        } catch (err) {
            done(err, null)
        }
    })
);

