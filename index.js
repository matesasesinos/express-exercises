//mongo
const mongoose = require("mongoose");
require("./config/db");

//express
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session"); //es necesario para menejar sesiones como por ejemplo los mensajes flash
//mongo store
const MongoStore = require("connect-mongo")(session);
//passport
const passport = require('./config/passport');

//Handlebars
const Handlebars = require('handlebars'); //se instala para que ande allow-prototype-access
const exphbs = require("express-handlebars"); //express handlebars, es el soporte de express
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); //se usa para poder seguir llamando directamente las variables de la vista

//enviroment vars (.env file)
require('dotenv').config({ path: '.env' });

//Flash messages
const flash = require('connect-flash');

//Express configuration
const path = require("path"); //se usa para rutas absolutas

app.use(express.json()); //respuestas en json
app.use(express.urlencoded({extended:true})); //pasar request en formularios, se puede usar bodyParser pero este es nativo

//Public and Handlebars configuration
//template engine
app.engine(
  ".hbs", //extensión que vamos a usar
  exphbs({
    extname: ".hbs",
    helpers: require('./helpers/hbs'), //un helper
    handlebars: allowInsecurePrototypeAccess(Handlebars) //habilitar el uso de variables en vistas
  })
);

app.set("view engine", ".hbs"); //engine que usamos

// statics files
app.use(express.static(path.join(__dirname, "public"))); //carpeta public

//session
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//alerts and flash messages
app.use(flash());

//middlewares
const setConfiguration = require('./middlewares/configuration').setConfiguration;
const setDemoUser = require('./middlewares/configuration').setDemoUser;
//site configuration commons
app.use(async (req,res,next) => {
  res.locals.configuration = await setConfiguration(1); //creamos la configuración inicial del sitio
  res.demoUser = await setDemoUser(); 
  next();
})
//other middlewares
app.use((req,res,next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.user;
  next();
});


//require all routes
const router = require('./routes');
const accounts = require('./routes/accounts');
const forms = require('./routes/formularios');
const config = require('./routes/config');
const users = require('./routes/users');
const un = require('./routes/un');


//call all routes
//statics routes without login
app.use('/', router());
app.use('/formularios', forms());

app.use('/', accounts());

app.use('/site', config());

app.use('/user', users());

app.use('/', un());



//port configured in .evn file
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Start app in port: " + port);
});