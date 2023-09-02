const createError = require("http-errors")
const { employeeServices } = require("../../services/index")
const uploadProfilePhoto = require("../common/image")
const bcrypt = require("bcrypt")
const employeeModel = require("../../services/employee/employee.model")

module.exports = {
    allEmployee: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1);
            const pageSize = 2
            const total = await employeeModel.countDocuments();
            const pageCount = Math.ceil(total / pageSize)
            const search = req.query.search

            const employee = await employeeServices.findAllData(page, pageSize, search)
            if (!employee) throw createError.NotFound("The employee with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get all employee",
                data: employee,
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
    oneEmployee: async (req, res, next) => {
        try {

            const id = req.params.id

            const employeeData = await employeeServices.findByEmployeeId(id)
            if (!employeeData) throw createError.NotFound("The employee with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one employee",
                data: employeeData
            })
        } catch (error) {
            next(error)
        }
    },
    createUpdateEmployeeByOwner: async (req, res, next) => {
        try {
            const req_data = req.body

            const roleData = await employeeServices.emailphoneNumber(req_data.email, req_data.phoneNumber)

            if (!roleData) {
                const existEmail = await employeeServices.findbyEmail(req_data.email);
                if (existEmail) {
                    throw createError.Conflict("Email already exists");
                }
                const existphoneNumber = await employeeServices.findbyphoneNumber(req_data.phoneNumber);
                if (existphoneNumber) {
                    throw createError.Conflict("phoneNumber already exists");
                }
            }
            req_data.technology_skills = await JSON.parse(req_data.technology_skills);

            const hash = await bcrypt.hash(req_data.password, 10);
            req_data.password = hash

            const existData = await employeeServices.existData(req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)
            // console.log(req_data.emergencyContact, req_data.aadharCard, req_data.bankAccountNumber, req_data.ifscCode, req_data.panCard, req_data.username)

            // IMAGE UPLOAD AND WHEN IMAGE IS UPDATE OLD IMAGE DELETE FUNCTION
            const upload = uploadProfilePhoto(req, res, roleData);
            req_data.profilePhoto = upload

            if (existData.status) {
                const employeeData = await employeeServices.createUpdateEmployeeData(req_data.email, req_data.phoneNumber, req_data);

                res.status(201).json({
                    success: true,
                    message: "employee is loaded...",
                    data: employeeData
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
    deleteEmployeeByOwner: async (req, res, next) => {
        try {

            const { id } = req.params

            const employee = await employeeServices.deleteEmployeeData(id)
            if (!employee) throw createError.NotFound("The employee with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "employee delete successfully",
                data: employee
            })
        } catch (error) {
            next(error)
        }
    }
}
