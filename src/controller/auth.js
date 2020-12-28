const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    
    var _user = new User();
    _user.firstName = req.body.firstName;
    _user.lastName = req.body.lastName;
    _user.email = req.body.email;
    _user.hash_password = req.body.password;
    _user.gender = req.body.gender;
    _user.dateOfBirth = new Date(req.body.dateOfBirth+"Z");
    _user.profilePicture = req.body.profilePicture;
    _user.type = req.body.type;
    _user.save((error, data) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                message: 'Something went wrong'
            });
        }

        if (data) {
          console.log(req.file);
            return res.status(201).json({
                message: req.file,
                
                
                
            })
        }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET, { 
          expiresIn: "1d",
        });
        const { _id, firstName, lastName, email, gender , dateOfBirth , profilePicture ,type} = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, gender , dateOfBirth , profilePicture,type},
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
