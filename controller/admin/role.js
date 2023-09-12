const createError = require("http-errors")
const { roleServices } = require("../../services/index")

module.exports = {
    createRole: async (req, res, next) => {
        try {
            const req_data = req.body;

            const role = await roleServices.findRole(req_data.role);
            if (role) throw createError.Conflict("This role already exist.")

            const roleData = await roleServices.createRole(req_data)

            res.status(201).send({
                success: true,
                message: "Role is created successfully.",
                data: roleData
            })
        } catch (error) {
            next(error)
        }
    },
    allRole: async (req, res, next) => {
        try {

            const allRoleData = await roleServices.findAllRole()

            res.status(201).send({
                success: true,
                message: "All role data is fetch successfully.",
                data: allRoleData
            })
        } catch (error) {
            next(error)
        }
    },
    oneRole: async (req, res, next) => {
        try {

            const { id } = req.params

            const roleData = await roleServices.findByRoleId(id)
            if (!roleData) throw createError.NotFound("The roleData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One role data is fetch successfully.",
                data: roleData
            })
        } catch (error) {
            next(error)
        }
    },
    updateRole: async (req, res, next) => {
        try {

            const id = req.params.id
            const req_data = req.body

            const role = await roleServices.findRole(req_data.role);
            if (role) throw createError.Conflict("This role already exist.")

            const roleData = await roleServices.updateRole(id, req_data)

            res.status(201).json({
                success: true,
                message: "Role data is update successfully.",
                data: roleData
            });
        } catch (error) {
            next(error);
        }
    },
    deleteRoleData: async (req, res, next) => {
        try {

            const { id } = req.params

            const roleData = await roleServices.deleteRoleData(id)
            if (!roleData) throw createError.NotFound("The roleData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Role data is delete successfully",
                data: roleData
            })
        } catch (error) {
            next(error)
        }
    }
}