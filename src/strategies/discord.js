const passport = require('passport');
const { Strategy } = require('passport-discord');
const DiscordUser = require('../database/schemas/DiscordUser');

passport.serializeUser((user, done) => {
    console.log("Serialising User...");
    console.log(user);
    done(null, user.discordId);
})

passport.deserializeUser(async (id, done) => {
    console.log("Deserialising User...");
    console.log(id);
    try{
        const user = await DiscordUser.findById(id);
        if(!user) throw new Error('User not found');
        console.log(user);
        done(null, user);
    } catch (err){
        console.log(err)
    }
})

passport.use(
    new Strategy({
    clientID: '1210047235253997588',
    clientSecret: 'Z5Juo9VTpiLu7q9qrg54eLKMRwAe2y1c',
    callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
    scope: ['identify'],
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log(profile);
        try {
            const discordUser = await DiscordUser.findOne({ discordId: profile.id })
            if(discordUser) {
                console.log(`Found user: ${discordUser}`)
                return done(null, discordUser);
            }
            else 
            {
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                });
                console.log(`Created user: ${newUser}`)
                return done(null, newUser);
            }
        } catch (err){
            console.log(err);
            return done(err, null);
        }
        

        

    })
)