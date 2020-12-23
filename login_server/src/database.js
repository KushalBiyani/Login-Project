// include library
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL_LOCAL;


// Establish Database Connection
mongoose.connect(
  db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }).then(() => {
    console.log('Database connected');
});

