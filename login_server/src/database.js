// include library
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL_LOCAL;


// Establish Database Connection
mongoose.connect(
  
  `mongodb+srv://Kushal:${process.env.MONGO_DB_PASSWORD}@cluster0.jglzn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }).then(() => {
    console.log('Database connected');
});

