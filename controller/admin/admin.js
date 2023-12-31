const createError = require("http-errors")
const { usersServices, roleServices } = require("../../services/index")
const uploadProfilePhoto = require("../common/image")
const bcrypt = require("bcrypt")
const path = require("path")

module.exports = {
    createUsersByAdmin: async (req, res, next) => {
        try {
            const req_data = req.body

            console.log("req_data", req_data)

            req_data.technology_skills = req_data.technology_skills ? JSON.parse(req_data.technology_skills) : []
            req_data.user_role = req_data.user_role ? req_data.user_role : null
            req_data.designation = req_data.designation ? req_data.designation : null
            req_data.profilePhoto = req_data.profilePhoto ? req_data.profilePhoto : null

            let hash;
            if (req_data.password) {
                hash = await bcrypt.hash(req_data.password, 10);
                req_data.password = hash
            }

            const existData = await usersServices.existData(null, req_data.email, req_data.phoneNumber, req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)

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
            const pageSize = parseInt(req.query.pageSize || 10);

            // const search = req.query.search

            const employeeId = await roleServices.findRoleId("employee")
            if (!employeeId) throw createError.NotFound("No any employee id is found.")
            // console.log("employeeId", employeeId._id)

            const total = await usersServices.countUsers(employeeId);
            const pageCount = Math.ceil(total / pageSize)

            const users = await usersServices.findAllData(employeeId._id, page, pageSize)
            if (!users) throw createError.NotFound("No any user is found.")

            res.status(201).send({
                success: true,
                message: "All user data is fetch successfully.",
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
                message: "One user data is fetch successfully.",
                data: usersData
            })
        } catch (error) {
            next(error)
        }
    },
    updateUsersByAdmin: async (req, res, next) => {
        try {
            console.log("req.body", req.body)
            console.log("req.files", req.files)
            const id = req.params.id
            const req_data = req.body

            req_data.technology_skills = req_data.technology_skills ? JSON.parse(req_data.technology_skills) : []
            req_data.user_role = req_data.user_role ? req_data.user_role : null
            req_data.designation = req_data.designation ? req_data.designation : null
            req_data.profilePhoto = req_data.profilePhoto ? req_data.profilePhoto : null

            let hash;
            if (req_data.password) {
                hash = await bcrypt.hash(req_data.password, 10);
                req_data.password = hash
            }

            const existData = await usersServices.existData(id, req_data.email, req_data.phoneNumber, req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)

            // IMAGE UPLOAD AND WHEN IMAGE IS UPDATE OLD IMAGE DELETE FUNCTION

            // await deleteOldProfileImages(req_data.profilePhoto);

            // if (req.files?.profilePhoto) {
            //     const upload = await uploadProfilePhoto(req, res, req.files.profilePhoto);
            //     req_data.profilePhoto = upload[0]
            // }

            // const file = req.files.profilePhoto
            // const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`)
            // console.log(filePath)

            // file.mv(filePath, err => {
            //     if (err) return res.status(500).send(err)
            // })

            // req_data.profilePhoto = filePath


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
    deleteUsersByAdmin: async (req, res, next) => {
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
