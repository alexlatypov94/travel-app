const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const userSchema = require('./models/userSchema');
const countrySchema = require('./models/countrySchema');
const bodyParser = require('body-parser');
const router = express.Router;

const app = express();

const PORT = config.get('port') || 5000;

app.use(express.json({limit: 15728640}));

app.use('/api', require('./routes/routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.get('/', (req, res) => res.send('good job'));
    app.listen(PORT, (err) => {
      if (err) {
        return console.log('something bad happened', err);
      }
      console.log(`server is listening on ${PORT}`);
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}
start();
