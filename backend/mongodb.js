import mongoose from 'mongoose';

exports.connectDb = (url) => {
    mongoose.connect('mongodb://localhost/microbloggos')
    
    const connection = mongoose.connection

    connection.once('open',() => {
    console.log("connected to db")
    })
}

