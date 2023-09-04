const createError = require("http-errors")
const { roleServices } = require("../../services/index")

module.exports = {
    createRole: async (req, res, next) => {
        try {
            const req_data = req.body;

            const role = await roleServices.findRole(req_data.role);
            if (role) throw createError.Conflict("this role already define.")

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
                message: "All roleData is fetch successfully.",
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
                message: "get one roleData",
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
            if (role) throw createError.Conflict("this role already define.")

            const roleData = await roleServices.updateRole(id, req_data)

            res.status(201).json({
                success: true,
                message: "roleData is loaded...",
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
                message: "roleData delete successfully",
                data: roleData
            })
        } catch (error) {
            next(error)
        }
    }
}