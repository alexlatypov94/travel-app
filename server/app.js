const express = require('express');
const config = require('config');
const connectionString = "mongodb+srv://maxim:qwerty123@cluster0.eimku.mongodb.net/app?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const userSchema = require('./models/userSchema')
const countrySchema = require('./models/countrySchema')
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const User = mongoose.model('user', userSchema, 'user');
const Country = mongoose.model('country', countrySchema, 'country');
let db;

const app = express();

const PORT = process.env.PORT || 5000;

async function createUser(username) {
    return new User({
      username,
      created: Date.now()
    }).save()
}
async function findUser(username) {
    return await User.findOne({ username })
}

async function createUser(username) {
  return new User({
    username,
    created: Date.now()
  }).save()
}

async function findCountry(country) {
  return await Country.findOne({ country })
}

async function createCountry(country) {
  return new Country({
    country,
    capital,
    info,
    videoUrl,
    photos,
  }).save()
}

routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

mongoose.connect(config.get("mongoUri"),
  { useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false },
    function(err, database){
      if(err) return console.log(err);
      db = database;
      
      app.get('/users', (req, res) => {
        res.send(db);
      })

      app.listen(PORT, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${PORT}`);
      })
    }
);
