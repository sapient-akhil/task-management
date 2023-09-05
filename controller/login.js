const createError = require("http-errors")
const { usersServices } = require("../services/index")
const Jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt")

module.exports = {
    login: async (req, res, next) => {
        try {
            const req_data = req.body;

            const users = await usersServices.findbyEmail(req_data.email);
            if (!users) throw createError.Conflict("email or password is wrong")

            const passwordMatch = await bcrypt.compare(req_data.password, users.password);
            if (!passwordMatch) throw createError.NotFound("email or password is wrong");

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
}