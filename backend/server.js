import express from 'express';
import bodyParser from 'body-parser';
//import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';

// DATABASE
//MongoDB
import mongodb from './mongodb.js'
const db_name = "microbloggos"
mongodb.connectDb(db_name);
//TODO create boilerplate for Sequelize in cas of SQL
//SQL

//Mongoose Schema
import User from './models/userModel';

//PassportJS
import passport from 'passport';
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;

//ROUTES
import user from './routes/user.routes';
import auth from './routes/auth.routes';
import tweets from './routes/tweets.routes';

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json())
app.use(cors());

//use passport
app.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    User.authenticate()
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'SecretToEditAndAddToignoredfile'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
         
    }
))

// Routes
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt',{session: false}),user);
app.use('/tweets', passport.authenticate('jwt',{session: false}),tweets);


app.listen(8080, () => console.log("Running on 8080"))
