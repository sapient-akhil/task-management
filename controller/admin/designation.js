const createError = require("http-errors")
const { designationServices } = require("../../services/index")

module.exports = {
    createDesignation: async (req, res, next) => {
        try {
            const req_data = req.body;

            const designation = await designationServices.findDesignation(req_data.designation);
            if (designation) throw createError.Conflict("This designation is already exists.")

            const designationData = await designationServices.createDesignationData(req_data)
            
            res.status(201).send({
                success: true,
                message: "Designation is successfully created.",
                data: designationData
            })
        } catch (error) {
            next(error)
        }
    },
    allDesignation: async (req, res, next) => {
        try {

            const alldesignationData = await designationServices.findAllDesignation()

            res.status(201).send({
                success: true,
                message: "All designation data is fetch successfully.",
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
                message: "One designation data is fetch successfully.",
                data: designationData
            })
        } catch (error) {
            next(error)
        }
    },
    updateDesignation: async (req, res, next) => {
        try {

            const id = req.params.id
            const req_data = req.body

            const designation = await designationServices.findDesignation(req_data.designation);
            if (designation) throw createError.Conflict("This designation already exists.")

            const designationData = await designationServices.updateDesignation(id, req_data)
            if (!designationData) throw createError.NotFound("The designationData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).json({
                success: true,
                message: "Designation data is update successfully.",
                data: designationData
            });
        } catch (error) {
            next(error);
        }
    },
    deleteDesignation: async (req, res, next) => {
        try {

            const { id } = req.params

            const designationData = await designationServices.deleteDesignationData(id)
            if (!designationData) throw createError.NotFound("The designationData with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Designation data is delete successfully.",
                data: designationData
            })
        } catch (error) {
            next(error)
        }
    }
}