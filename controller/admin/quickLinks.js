const createError = require("http-errors")
const { quickLinksServices } = require("../../services/index")

module.exports = {
    createQuickLinks: async (req, res, next) => {
        try {
            const req_data = req.body;

            const quickLinks = await quickLinksServices.findQuickLinks(req_data.link, req_data.name);
            if (quickLinks) throw createError.Conflict("This link and name is already exists.")

            const quickLinksData = await quickLinksServices.createQuickLinks(req_data)

            res.status(201).send({
                success: true,
                message: " Quick link is created successfully.",
                data: quickLinksData
            })
        } catch (error) {
            next(error)
        }
    },
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
    },
    updateQuickLinks: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const quickLinks = await quickLinksServices.findQuickLinks(req_data.link);
            if (quickLinks) throw createError.Conflict("This link is already exists.")

            const quickLinksData = await quickLinksServices.updateQuickLinks(id, req_data)
            if (!quickLinksData.length) throw createError.NotFound("The quick link with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Quick link is update successfully.",
                data: quickLinksData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteQuickLinks: async (req, res, next) => {
        try {

            const { id } = req.params

            const quickLinks = await quickLinksServices.deleteQuickLinks(id)
            if (!quickLinks) throw createError.NotFound("The quick link with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Quick link is delete successfully",
                data: quickLinks
            })
        } catch (error) {
            next(error)
        }
    }
}