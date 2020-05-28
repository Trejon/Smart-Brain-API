const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
  // connection: {
  //   host : process.env.POSTGRES_HOST,
  //   user : process.env.POSTGRES_USER,
  //   password : process.env.POSTGRES_PASSWORD,
  //   database : process.env.POSTGRES_DB
  // }
  // client: 'pg',
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {res.send('it is working!') })
app.post('/signin', signin.signinAuthentication(db, bcrypt) )
app.post('/signup', (req, res) => {signup.handleSignup(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db) })
app.post('/profile/:id', (req, res) => {profile.handleProfileUpdate(req, res, db)  })
app.put('/image', (req, res) => {image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`App is running on port ${process.env.PORT}`);
// })

app.listen(3000, () => {
  console.log(`App is running on port 3000`);
})