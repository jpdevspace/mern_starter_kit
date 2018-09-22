const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Routes
const blogRoutes = require('./API/routes/blog');
const contactRoutes = require('./API/routes/contact');
const dashboardRoutes = require('./API/routes/dashboard');
const projectsRoutes = require('./API/routes/projects');

// Config
const config = require('./config/config');
const PORT = process.env.PORT || process.env.MY_PORT;

const app = express();

// Static Folders
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Mongoose 
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error.bind(console, 'connection error:'))
mongoose.Promise = global.Promise

  // Midleware
  // Morgan
app.use(morgan('dev'));
  // BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  // CORS
app.use(cors());

// API Routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectsRoutes);

// All other routes handled with React
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Creating an error if no route was found
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(PORT, () => console.log(`Start your engines... Listening on port ${PORT}!`));