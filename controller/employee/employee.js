const createError = require("http-errors")
const { employeeServices } = require("../../services/index")
const Jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt")

module.exports = {
    employeeLogin: async (req, res, next) => {
        try {
            const req_data = req.body;

            const employee = await employeeServices.findbyEmail(req_data.email);
            if (!employee) throw createError.Conflict("email or password is wrong")

            const passwordMatch = await bcrypt.compare(req_data.password, employee.password);
            if (!passwordMatch) throw createError.NotFound("email or password is wrong");

            const payload = {
                user_role:employee.user_role,
                email: employee.email,
                password: employee.password
            };

            const jwt = Jwt.sign(payload, JWTSecretKey, { expiresIn: 600 })
            res.status(201).send({
                jwt,
                user: employee,
            })
        } catch (error) {
            next(error)
        }
    },
}