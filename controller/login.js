const createError = require("http-errors")
const { usersServices, otpServices } = require("../services/index")
const Jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt")
const nodemailer = require("../helper/nodemailer")
const usersModel = require("../services/users/users.model")
const otpModel = require("../services/otp/otp.model")

module.exports = {
    login: async (req, res, next) => {
        try {
            const req_data = req.body;

            const users = await usersServices.findbyEmail(req_data.email);
            if (!users) throw createError.Conflict("email or password is wrong")
            // console.log("users::", users)

            const passwordMatch = await bcrypt.compare(req_data.password, users.password);
            if (!passwordMatch) throw createError.NotFound("email or password is wrong");
            // console.log("passwordMatch", passwordMatch)
            const payload = {
                user_role: users.user_role,
                email: users.email,
                password: users.password
            };
            // console.log("payload", payload)
            const jwt = Jwt.sign(payload, JWTSecretKey, { expiresIn: 86400 })
            res.status(201).send({
                jwt,
                user: users,
            })
        } catch (error) {
            next(error)
        }
    },
    forgottenPassword: async (req, res, next) => {
        try {
            const req_data = req.body;
            if (req_data.email === "")
                return res.json({
                    success: false,
                    message: "Please enter an Email",
                });
            const record = await usersServices.findbyEmail(req_data.email);
            if (!record)
                return res.json({
                    success: false,
                    message: "Email Not Found, Please Try With Registered Email",
                });
            var subject = "Verification For Forgot Password";

            if (record) {
                await otpModel.deleteMany({ email: req_data.email }); // Delete existing OTP for the same email
                let otpCode = Math.floor(100000 + Math.random() * 900000);
                let otpData = new otpModel({
                    email: req.body.email,
                    otp: otpCode,
                    expireIn: new Date().getTime() + 300 * 1000,
                });

                let otpResponse = await otpData.save();
                console.log("otpResponse", otpResponse)

                var html =
                    "" +
                    `<p style="margin: 5px;font-weight: 500; font-size: 16px;text-align: center;">
                                       OTP: ${otpCode}
                      </p>` +
                    "By Admin";

                const sendVerification = await nodemailer.sendEmail(
                    record.email,
                    subject,
                    html
                );

                if (sendVerification)
                    return res.json({
                        success: true,
                        message: "Verification email sent successfully",
                    });
                return res.json({ success: true, message: "Email not Found" });
            }
            return res.json({ success: true, message: "Email not Found" });
        } catch (err) {
            return next(err);
        }
    },
    verifyOtp: async (req, res, next) => {
        try {
            const req_data = req.body;
            let data = await otpServices.findbyOtpAndEmail(req_data.email, req_data.otp);

            if (!data) {
                return res.json({ success: false, message: "Invalid OTP" });
            }
            if (String(req_data.otp) !== String(data.otp)) {
                return res.json({ success: false, message: "Invalid OTP" });
            }

            let currentTime = new Date().getTime();
            let diff = data.expireIn - currentTime;
            if (diff < 0) {
                return res.json({ success: false, message: "OTP Expired" });
            }

            const payload = {
                email: data.email,
                otp: data.otp
            };

            const jwt = Jwt.sign(payload, JWTSecretKey, { expiresIn: 86400 })
            console.log("jwt", jwt)

            return res.json({ success: true, message: "Valid OTP", jwt });

        } catch (err) {
            return next(err);
        }
    },
    resetForgotPassword: async (req, res) => {
        try {
            const req_data = req.body;
            const token = req_data.token;

            if (!token) {
                return res.status(400).json({ status: false, message: "Invalid token" });
            }

            // Verify the token
            Jwt.verify(token, JWTSecretKey, async (err, payload) => {
                if (err) {

                    return res.status(401).json({ status: false, message: "User not authorized" });
                }
                // console.log("payload", payload)

                try {
                    const record = await usersServices.findbyEmail(payload.email);
                    if (!record) {
                        return res.status(404).json({ status: false, message: "Requested Route not found" });
                    }

                    const data = await otpServices.upadtePassword(payload.email, {
                        password: await bcrypt.hash(req_data.password, 10)
                    });

                    if (!data) {
                        return res.status(500).json({ status: false, message: "Password Reset Failed" });
                    }

                    return res.json({ status: true, message: "Password Updated Successfully" });
                } catch (err) {
                    console.error("Password Reset Error: ", err);
                    return res.status(500).json({
                        status: false,
                        message: "Something went wrong during password reset"
                    });
                }
            });
        } catch (err) {
            console.error("General Error: ", err);
            return res.status(500).json({
                status: false,
                message: "Something went wrong"
            });
        }
    },
}