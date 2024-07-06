const express = require('express');
const { handlePasswordReset, handleSendPasswordResetLink } = require('../controller/resetPassword');

const router = express.Router();

router.post("/", handleSendPasswordResetLink)
router.post("/:userId/:token", handlePasswordReset)
module.exports = router;