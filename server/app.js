// фрэймворк node js
const express = require('express');
// подключаем конфиг файл
const config = require('config');
// подключаем пакет mongoose
const mongoose = require('mongoose');
const userSchema = require('./models/userSchema')
const countrySchema = require('./models/countrySchema')
const bodyParser = require('body-parser');
const router = express.Router;

// результат работы функции экспресс (будущий сервер)
const app = express();
// записываем порт из файла конфига
const PORT = config.get('port') || 5000;
// регистрируем роут по пути /api/auth

app.use(express.json())

app.use('/api', require('./routes/routes'))
// app.get('/', (req, res) => res.send('we are on home'))



async function start() {
  try {
    // подключаемся к базе данных монго дб и получаем на выходе промис в параметры пишем 1. ссылку из конфига на дб(url на базу данных из mongo db), опции работы с базой,
    await mongoose.connect(config.get("mongoUri"),
    { useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true  
    })
      const db = mongoose.connection;
      app.get("/", (req, res)=>res.send('good job'))
      // этим методом запускаем сервер и говорим ему прослушивать запросы с порта если ошибки приходят пишем "что-то случилось" или указываем что сервер запущен на порту и указываем номер порта
      // console.log(db)
      app.listen(PORT, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${PORT}`);
      })
  } catch (e) {
    console.log('Server Error', e.message);
    // выходим из глобального объекта process нод джса через метод exit()
    process.exit(1)
  }
}
start()
