const mongoose = require('mongoose');

const Portfolio = new mongoose.Schema({
  image: [ { type: String } ],
  tags: [ { type: String } ],
  description: { type: String, required: true },
  links: { 
    github: String,
    instagram: String,
    live: String,
    additional: String
  }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;