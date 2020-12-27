const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password,done) => {
    const user = await Users.findOne({ email });

    if(!user) {
        return done(null,false,{
            message: 'El usuario no existe'
        });
    }
    
    const verifyPass = user.comparePassword(password);

    if(!verifyPass) {
        return done(null,false,{
            message: 'Contraseña incorrecta'
        });
    }

    return done(null,user);

}));

passport.serializeUser((user,done) => done(null,user._id));

passport.deserializeUser(async (id,done) => {
    const user = await Users.findById(id).exec();
    return done(null,user);
});

module.exports = passport;