const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const database = require('./database');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require("./routes/auth");

app.use(cors());

// route
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'login_client/build')));
app.use('/api', authRoutes);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'login_client/build', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log("Server running at port : " + port);
});
