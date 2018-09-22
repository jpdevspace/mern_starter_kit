const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:  {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String,nrequired: true },
  posts: [ { type: Schema.Types.ObjectId, ref: "Posts" } ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;