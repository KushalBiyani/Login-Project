const express = require('express');
const { signup, signin, signout } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();
const { upload } = require("../common-middleware");

router.post('/signup',upload.single("profilePicture"),validateSignupRequest, isRequestValidated, signup );
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.post('/signout', signout)

module.exports = router;