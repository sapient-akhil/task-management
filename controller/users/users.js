const createError = require("http-errors")
const { usersServices, roleServices, otpServices } = require("../../services/index")
const Jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt")

module.exports = {
    usersLogin: async (req, res, next) => {
        try {
            const req_data = req.body;

            const users = await usersServices.findbyEmail(req_data.email);
            if (!users) throw createError.Conflict("Email or password is wrong")

            const passwordMatch = await bcrypt.compare(req_data.password, users.password);
            if (!passwordMatch) throw createError.NotFound("Email or password is wrong");

            const payload = {
                user_role: users.user_role,
                email: users.email,
                password: users.password
            };

            const jwt = Jwt.sign(payload, JWTSecretKey, { expiresIn: 600 })
            res.status(201).send({
                jwt,
                user: users,
            })
        } catch (error) {
            next(error)
        }
    },

    allUsers: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = parseInt(req.query.pageSize || 10);

            const search = req.query.search

            const employeeId = await roleServices.findRoleId("employee")
            if (!employeeId) throw createError.NotFound("No any employee id is found.")

            const total = await usersServices.countUsers(employeeId);
            const pageCount = Math.ceil(total / pageSize)

            const users = await usersServices.findAllData(employeeId._id, page, pageSize, search)
            if (!users) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "All users is fetch successfully.",
                data: users,
                meta: {
                    pagination: {
                        page, pageSize, pageCount, total
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    },
    oneUsers: async (req, res, next) => {
        try {

            const id = req.params.id

            const usersData = await usersServices.findByUsersIdByuser(id)
            if (!usersData) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One user is fetch successfully.",
                data: usersData
            })
        } catch (error) {
            next(error)
        }
    }
}
