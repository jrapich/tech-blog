//import express, session, handlebars, paths, routes, and any helper functions
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//const helpers = require('./utils/helpers');

//boilerplate express, session, and handlebars setup
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();
//const hbs = exphbs.create({ helpers });

//configuration for session/sequelize sync
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      //sets the session cookie to expire after 12 hours
      //this means after 12 hours, user will have to log in again
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: true,
      //secure:true will only issue cookie if connecting over SSL/https
      //protects frontend user if someone is trying to steal their cookies, and in general its good idea to use encryption wherever possible
      //should be set to false in dev environment as localhost doesnt use ssl/https
      secure:false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

//use handlebars as primary view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//use the routes defined in /controllers/
app.use(routes);

//start the server
//force:false so our db data is not overwritten with each restart
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));
});