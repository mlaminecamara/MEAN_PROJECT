import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from  'passport-local-mongoose';

let tweetsSchema = new Schema({
    username:String,
    content: String,
    // update: {
    //     updatedAt: Date.now(),
    //     $setOnInsert: {
    //       createdAt: Date.now()
    //     }
    // }
    //timestamps:true
});

tweetsSchema.plugin(passportLocalMongoose);

let Tweets = mongoose.model('Tweets',tweetsSchema);

export default Tweets;