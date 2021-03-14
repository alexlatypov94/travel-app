const { Schema, model, Types } = require('mongoose');

const imageSchema = new Schema({
  name: String,
  desc: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = model('Image', imageSchema);