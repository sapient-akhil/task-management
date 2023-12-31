const createError = require("http-errors")
const { technologySkillsServices } = require("../../services/index")

module.exports = {
    createTechnologySkills: async (req, res, next) => {
        try {
            const req_data = req.body;

            const technologySkill = await technologySkillsServices.findTechnologySkills(req_data.technology_skills);
            if (technologySkill) throw createError.Conflict("Technology skill already exist")

            const technologySkillsData = await technologySkillsServices.createTechnologySkills(req_data)

            res.status(201).send({
                success: true,
                message: "Technology skill is created successfully.",
                data: technologySkillsData
            })
        } catch (error) {
            next(error)
        }
    },
    allTechnologySkills: async (req, res, next) => {
        try {

            const technologySkills = await technologySkillsServices.findAllTechnologySkills()

            res.status(201).send({
                success: true,
                message: "All technology skills is fetch successfully.",
                data: technologySkills
            })
        } catch (error) {
            next(error)
        }
    },
    oneTechnologySkills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technologySkills = await technologySkillsServices.findByTechnologySkillsId(id)
            if (!technologySkills) throw createError.NotFound("The technology skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "One technology skill is fetch successfully.",
                data: technologySkills
            })
        } catch (error) {
            next(error)
        }
    },
    updateTechnologySkills: async (req, res, next) => {
        try {
            const req_data = req.body;
            const id = req.params.id

            const technologySkill = await technologySkillsServices.findTechnologySkills(req_data.technology_skills);
            if (technologySkill) throw createError.Conflict("Technology skills already exist.")

            const technologySkillsData = await technologySkillsServices.updateTechnologySkills(id, req_data)
            if (!technologySkillsData.length) throw createError.NotFound("The technology skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Technology skill is update successfully.",
                data: technologySkillsData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteTechnologySkills: async (req, res, next) => {
        try {

            const { id } = req.params

            const technologySkill = await technologySkillsServices.deleteTechnologySkills(id)
            if (!technologySkill) throw createError.NotFound("The technology skill with the provided ID could not be found. Please ensure the ID is correct and try again")

            res.status(201).send({
                success: true,
                message: "Technology skill is delete successfully",
                data: technologySkill
            })
        } catch (error) {
            next(error)
        }
    }
}