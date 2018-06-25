import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';

// DATABASE
//MongoDB
import mongodb from './mongodb.js'
const db_name = "balaizProto"
mongodb.connectDb(db_name);
//TODO create boilerplate for Sequelize in cas of SQL
//SQL


// GraphQL Schemas
//import schema from './schema';


const app = express();
app.use(bodyParser.json())
app.use(cors());

// mongoose.connect('mongodb://localhost/balaizProto')

// const connection = mongoose.connection

// connection.once('open',() => {
//   console.log("connected to db")
// })



// app.use('/graphiql', graphiqlExpress({
//   endpointURL:'/graphql'
// }));

//app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
// app.get('/secure', authenticationRequired, (req, res) => {
//   res.json(req.jwt);
// });

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', (req, res) => {
  res.json([
    {message: 'Hello, word!'},
    {message: "Yet another Hello World!"}
]);
});

app.post('/api/user/create', (req,res) => {
  console.log("body")
  console.log(req.body)
  console.log("---")
  const newUser = {
    profile: {
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      login: req.body.email,
    },
    credentials: {
      password : {
        value: req.body.password
      }
    }
  };
  console.log(newUser)
  oktaClient.createUser(newUser)
  .then(user => {
    console.log('Created user', user);
    res.end()
  });
})

app.listen(8080, () => console.log("Running on 8080"))
