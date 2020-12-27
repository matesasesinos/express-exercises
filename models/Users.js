const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: String,
    token_expire: Date,
    created: Date,
    avatar: String,
    active:{
        type: Boolean,
        default: 1
    }
});

//password Hash
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { //si esta hasheado el password no hacer nada
        return next();
    }
    //hash
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

userSchema.post('save', async function(error,doc,next) {
    if(error.name === 'MongoError' && error.code === 11000){
        const errorMsg = {
            msg: 'El correo ya esta en uso'
        }
        next(errorMsg);
    } else {
        next(error);
    }
});

//autenticar usuarios
userSchema.methods = {
    comparePassword: function(password) {
        return bcrypt.compareSync(password,this.password);
    }
}

module.exports = mongoose.model('User', userSchema);