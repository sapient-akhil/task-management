const createError = require("http-errors")
const { designationServices } = require("../../services/index")

module.exports = {
    allDesignation: async (req, res, next) => {
        try {

            const alldesignationData = await designationServices.findAllDesignation()

            res.status(201).send({
                success: true,
                message: "get all designationData",
                data: alldesignationData
            })
        } catch (error) {
            next(error)
        }
    },
    oneDesignation: async (req, res, next) => {
        try {

            const { id } = req.params

            const designationData = await designationServices.findByDesignationId(id)
            if (!designationData) throw createError.NotFound("The designationData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "get one designationData",
                data: designationData
            })
        } catch (error) {
            next(error)
        }
    }
}