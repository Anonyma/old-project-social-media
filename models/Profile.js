const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String]
  },
  portfolio: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'imgs'
  }],
  featuredimg: {
    type: String
  },
  web: {
    type: [String]
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
