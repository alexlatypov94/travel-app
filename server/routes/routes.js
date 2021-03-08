// достаем роутер
const { Router } = require('express');
const mongoose = require('mongoose');
// создаем роутер
const router = Router();
const User = require('../models/userSchema');
const Country = require('../models/countrySchema');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// указываем путь для обработки пост запроса localhost:5000/register
router.get('/countries', async (req, res) => {
    try{
        const countries = await Country.find();
        res.send(countries);
    }catch (e) {
        res.status(404).json({message: 'Database is not found'});
    }
})

router.post('/register',
        //проверяем поля email на тип почты и пароли на корректность длины экспресс валидатором 
    [
        check('email', 'Incorrect e-mail').isEmail(),
        check('password', 'Minimal password length of symbols is 6').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        // валидация объекта запроса 'req'
        const errors = validationResult(req);
        // // Если массив с ошибок после обработки валидатором на правильность написания email и длинну пароля не пустой, сервер выдает ответ со статусом 400, о том что пользовательские данные не верны
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Incorrect register inputs'})
        }
        // выделение email и пароля из тела запроса сервера
        const {email, password} = req.body
        // ждем пока модель пользователя будет ждать пользователя по email
        const candidate = await User.findOne({ email });

        // если пользователь найден выводим сообщение что пользозватель уже существует
        if (candidate) res.status(400).json({ message: 'This user is exist' });

        // Хэшируем пароль для безопасности и ождидаем конца 
        const hashedPassword = await bcrypt.hash(password, 12);

        // создаем пользователя с хэш-паролем
        const user = new User({email: email, password: hashedPassword});

        // ожидаем сохранения пользователя
        await user.save();

        // отвечаем на фронтенд что пользователь создан/зарегистрирован
        res.status(201).json({message: 'user created'})

    } catch (e) {
        // если прилетели ошибки, выводим что че-то не так
        res.status(500).json({error: e , message: 'Something wrong, try to repeat later'})
    }
})

router.post('/login',
        // проверка на корректность e-mail, существование пароля
[
    check('email', 'Enter the correct e-mail').normalizeEmail().isEmail(),
    check('password', 'Password exists').exists()
],  
        // обработка запроса к серверу
async (req, res) => {
    try {
        // валидация объекта запроса 'req'
        const errors = validationResult(req);
        // Если массив с ошибок после обработки валидатором на правильность написания email и существует ли пароль, сервер выдает ответ со статусом 400, о том что пользовательские данные не верны для авторизации
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Incorrect email or password to entry'})
        }
        // выделение email и пароля из тела запроса сервера
        const {email, password} = req.body;
        const user = await User.findOne({email})
        // ждем пока модель пользователя будет ждать пользователя по email
        // Boolean который сравнивает захэшированные пароли
        const isMatch = await bcrypt.compare(password, user.password)
        // Если сравнение не прошло успешно вовзращаем сообщение на фронтэнд
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid password'})
        }
        // создание токена с параметрами (толкьо опции ) 1. объект в котором будут зашифрованны данные из userID 2. секретный ключ из конфига (реально секретный бесспорно) 3. объект указывающий через сколько токен прекратит существование ( 1 час )
        const token = jwt.sign({userId: user.id}, config.get("jwtSecret"), {expiresIn: '1h'})
        // по умолчанию статус 200 после sign передаем токен, и юзер id по завершению логина
        // res.json({token, userId: user.id, email})
        res.send('You enter the system')
    } catch (e) {
        // если прилетели ошибки, выводим что че-то не так
        res.status(500).json({message: `Something wrong, try to repeat later${e}`})
    }
})

module.exports = router;