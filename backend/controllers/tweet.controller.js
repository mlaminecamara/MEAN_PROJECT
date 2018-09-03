import Tweets from '../models/tweetsModel';
import jwt from 'jsonwebtoken';
import passport from 'passport';
require("babel-polyfill");
import User from '../models/userModel';

const TwtController = {};

TwtController.addTweet = async(req, res) => {
    
        const bearerheader = req.headers["authorization"];
        if( typeof bearerheader !== undefined)
        {
            const bearer = bearerheader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
        }
        else
            res.status(403).send('Token not found');
    
        var user = jwt.decode(req.token, function (err, user)
        {
            if(err)
                return (err)
                
            return user;
        })
        Tweets.create({username:user.id, content:req.body.content}, function(err, user){
            console.log('tweet created');
            res.end();
                    
        }) 
}

export default TwtController;

