const createError = require("http-errors")
const { quickLinksServices } = require("../../services/index")

module.exports = {

    allQuickLinks: async (req, res, next) => {
        try {

            const quickLinks = await quickLinksServices.findAllQuickLinks()

            res.status(201).send({
                success: true,
                message: "All quick link is fetch successfully.",
                data: quickLinks
            })
        } catch (error) {
            next(error)
        }
    },
    oneQuickLinks: async (req, res, next) => {
        try {

            const { id } = req.params

            const quickLinks = await quickLinksServices.findByQuickLinksId(id)
            if (!quickLinks) throw createError.NotFound("The leave status with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One quick link is fetch successfully.",
                data: quickLinks
            })
        } catch (error) {
            next(error)
        }
    }
}