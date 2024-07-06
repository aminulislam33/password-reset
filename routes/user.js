const express = require('express');
const { handlerUserSignUp } = require('../controller/user');

const router = express.Router();

router.post("/signup", handlerUserSignUp);

module.exports = router;