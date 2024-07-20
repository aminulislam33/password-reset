const Token = require("../models/token");
const crypto = require('crypto');
const { User } = require("../models/user");
const handleSendEmail = require("../utils/sendMail");

async function handleSendPasswordResetLink(req, res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await Token.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await handleSendEmail(user.email, "Password Reset", link);
        console.log("Password reset link: ", link);

        return res.json({ 
            message: `Password reset link sent to your email ${link}`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

async function handlePasswordReset(req, res) {
    const { userId, token: tokenParam } = req.params;
    console.log(`request params are: ${userId} and ${tokenParam}`)
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ message: "Invalid link or expired" });
        }

        const token = await Token.findOne({
            userId: userId,
            token: tokenParam
        });

        if (!token) {
            return res.json({ message: "Invalid token" });
        }

        user.password = req.body.password;
        await user.save();
        await Token.deleteOne({ _id: token._id });

        return res.status(200).json({
            message: "Password Reset Successfully",
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = {
    handleSendPasswordResetLink,
    handlePasswordReset
}