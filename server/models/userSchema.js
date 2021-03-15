const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  created: {
    type: Date,
  },
  links: {
    type: Types.ObjectId,
    ref: 'Link',
  },
  image: {
    type: String
  },
  username: {
    type: String
  },
  marks: {Object}
});

module.exports = model('User', userSchema);
