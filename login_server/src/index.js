require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const database = require('./database');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require("./routes/auth");

app.use(cors());

// route
app.use(bodyParser.json());

app.use('/api', authRoutes);


// Start Server
app.listen(port, () => {
  console.log("Server running at port : " + port);
});
// {
//     "firstName": "kushal",
//     "lastName":"biyani",
//     "email" : "kuslalbiyani@gmail.com",
//     "password":"12345684",
//     "gender":"male",
//     "dateOfBirth":"03/14/2000"
    
//   }