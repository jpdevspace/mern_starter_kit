const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  tags: [ { type: String } ],
  content: { type: String, required: true },
  images: [{ type: String }],
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;