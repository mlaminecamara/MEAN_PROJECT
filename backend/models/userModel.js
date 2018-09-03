import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from  'passport-local-mongoose';


let userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userSchema);

export default User;