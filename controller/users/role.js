const createError = require("http-errors")
const { roleServices } = require("../../services/index")

module.exports = {
    allRole: async (req, res, next) => {
        try {

            const allRoleData = await roleServices.findAllRole()

            res.status(201).send({
                success: true,
                message: "All roles is fetch successfully.",
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
                message: "One role is fetch successfully.",
                data: roleData
            })
        } catch (error) {
            next(error)
        }
    }
}