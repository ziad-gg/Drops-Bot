const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  // dropsCliamed: []
});

module.exports = model('Users', UserSchema);
