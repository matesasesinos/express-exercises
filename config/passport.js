const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email,password,done) => {
    const usuario = await Users.findOne({ email });

    if(!usuario) {
        return done(null,false,{
            message: 'El usuario no existe'
        });
    }
    
    const verificarPass = usuario.comparePassword(password);

    if(!verificarPass) {
        return done(null,false,{
            message: 'Contraseña incorrecta'
        });
    }

    return done(null,usuario);

}));

passport.serializeUser((usuario,done) => done(null,usuario._id));

passport.deserializeUser(async (id,done) => {
    const usuario = await Users.findById(id).exec();
    return done(null,usuario);
});

module.exports = passport;