// On importe le module Router d'express
import {Router} from 'express'
//On importe les controllers
import TwtController from '../controllers/tweet.controller'
import passport from 'passport';

// On instancie une route
const router  = new Router();

// Route en post pour poster un tweet
router.post('/tweets',(req, res) => {
    TwtController.addTweet(req, res);
})

// Route en get pour lire tous les tweets
router.get('/tweets', (req, res) => {
    TwtController.showTweets(req, res);
})

export default router;