const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();
const User = require('../models/userSchema');
const Country = require('../models/countrySchema');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find();
    res.send(countries);
  } catch (e) {
    res.status(404).json({ message: 'Database is not found' });
  }
});

router.post(
  '/register',
  [
    check('email', 'Incorrect e-mail').isEmail(),
    check('password', 'Minimal password length of symbols is 6').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect register inputs',
        });
      }

      const { email, password, image } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) res.status(400).json({ message: 'This user is exist' });

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email: email, password: hashedPassword, image: image });

      await user.save();

      res.status(201).json({ message: 'user created' });
    } catch (e) {
      res.status(500).json({
        error: e,
        message: 'Something wrong, try to repeat later',
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter the correct e-mail').normalizeEmail().isEmail(),
    check('password', 'Password exists').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect email or password to entry',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });
      res.status(201).json({
        token: token,
        message: 'You enter the system' 
      });
    } catch (e) {
      res.status(500).json({
        message: `Something wrong, try to repeat later${e}`,
      });
    }
  }
);

router.post(
  '/save-image',
  async (req, res) => {
    try {
      const { email, image } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: 'User not found',
        });
      }

      user.image = image;
      await user.save();
      res.status(201).json({ message: 'image downloaded'});

      return res.status(201).json({ message: 'image downloaded' });
    } catch (e) {
      res.status(500).json({
        message: `Something wrong, try to repeat later ${e}`,
      });
    }
  }
);



module.exports = router;
