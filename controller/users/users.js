const createError = require("http-errors")
const { usersServices } = require("../../services/index")
const Jwt = require("jsonwebtoken")
const JWTSecretKey = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt")
const usersModel = require("../../services/users/users.model")

module.exports = {
    usersLogin: async (req, res, next) => {
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
            const pageSize = 2
            const total = await usersModel.countDocuments();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search

            const users = await usersServices.findAllData(page, pageSize, search)
            if (!users) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get all users",
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

            const usersData = await usersServices.findByUsersId(id)
            if (!usersData) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one users",
                data: usersData
            })
        } catch (error) {
            next(error)
        }
    }
}
