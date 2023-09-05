const createError = require("http-errors")
const { usersServices } = require("../../services/index")
const uploadProfilePhoto = require("../common/image")
const bcrypt = require("bcrypt")
const usersModel = require("../../services/users/users.model")

module.exports = {
    createUsersByOwner: async (req, res, next) => {
        try {
            const req_data = req.body

            req_data.technology_skills = await JSON.parse(req_data.technology_skills);

            const hash = await bcrypt.hash(req_data.password, 10);
            req_data.password = hash

            const existData = await usersServices.existData(null, req_data.email, req_data.phoneNumber, req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)

            // IMAGE UPLOAD AND WHEN IMAGE IS UPDATE OLD IMAGE DELETE FUNCTION
            const upload = uploadProfilePhoto(req, res, req_data.profilePhoto);
            req_data.profilePhoto = upload

            if (existData.status) {
                const usersData = await usersServices.createUsersData(req_data);

                res.status(201).json({
                    success: true,
                    message: "User is created successfully.",
                    data: usersData
                });
            } else {
                res.status(201).json({
                    success: false,
                    message: existData.message,
                });
            }
        } catch (error) {
            next(error);
        }
    },
    allUsers: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = 2
            const total = await usersServices.countUsers();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search

            const users = await usersServices.findAllData(page, pageSize, search)
            if (!users) throw createError.NotFound("No any userData is found.")

            res.status(201).send({
                success: true,
                message: "All userData is fetch successfully.",
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
                message: "One userData is fetch successfully.",
                data: usersData
            })
        } catch (error) {
            next(error)
        }
    },
    updateUsersByOwner: async (req, res, next) => {
        try {

            const id = req.params.id
            const req_data = req.body

            req_data.technology_skills = await JSON.parse(req_data.technology_skills);

            const hash = await bcrypt.hash(req_data.password, 10);
            req_data.password = hash

            const existData = await usersServices.existData(id, req_data.email, req_data.phoneNumber, req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)

            // IMAGE UPLOAD AND WHEN IMAGE IS UPDATE OLD IMAGE DELETE FUNCTION
            const upload = uploadProfilePhoto(req, res, req_data.profilePhoto);
            req_data.profilePhoto = upload

            if (existData.status) {
                const usersData = await usersServices.updateUsersData(id, req_data)
                if (!usersData) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

                res.status(201).json({
                    success: true,
                    message: "User is update successfully.",
                    data: usersData
                });
            } else {
                res.status(201).json({
                    success: false,
                    message: existData.message,
                });
            }
        } catch (error) {
            next(error);
        }
    },
    deleteUsersByOwner: async (req, res, next) => {
        try {

            const { id } = req.params

            const users = await usersServices.deleteUsersData(id)
            if (!users) throw createError.NotFound("The users with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "User is delete successfully",
                data: users
            })
        } catch (error) {
            next(error)
        }
    }
}
