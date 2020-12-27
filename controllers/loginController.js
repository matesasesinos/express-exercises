

exports.loginHome = (req,res) => {
    res.render('login/login', {
        pageTitle: 'Login',
        bodyClass: 'body-login',
        login: true
    });
}


//crear cuenta
exports.signinForm = (req,res) => {
    res.render('login/signin', {
        pageTitle: 'Crear cuenta',
        bodyClass: 'body-signin',
        signin: true
    });
}