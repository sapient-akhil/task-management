const joi = require("joi");
const validate = require("./joivalidation")

module.exports = {
    usersSchema: joi.object().keys({
        username: validate.reqstring,
        email: validate.email,
        name: validate.reqstring,
        address: validate.reqstring,
        birthDate: validate.reqDate,
        joinDate: validate.reqDate,
        probationDate: validate.reqDate,
        appraisalDate: validate.reqDate,
        phoneNumber: validate.reqstring,
        emergencyContact: validate.reqstring,
        aadharCard: validate.number,
        panCard: validate.reqstring,
        bankName: validate.reqstring,
        bankAccountNumber: validate.number,
        ifscCode: validate.reqstring,
        nameAsPerBank: validate.reqstring,
        pastExperience: validate.reqNumber,
        experienceWithUS: validate.number,
        totalExperience: validate.number,
        ctc: validate.number,
        profilePhoto: validate.string,
        designation: validate.id,
        user_role: validate.id,
        technology_skills: validate.string,
        password: validate.password,
        profilePhoto: validate.string
    }),
    roleSchema: joi.object().keys({
        role: validate.reqstring
    }),
    designationSchema: joi.object().keys({
        designation: validate.reqstring
    }),
    technology_skills_Schema: joi.object().keys({
        technology_skills: validate.reqstring
    }),
    params: joi.object().keys({
        id: validate.reqId
    }),
    project_category_Schema: joi.object().keys({
        name: validate.reqstring
    }),
    projectsSchema: joi.object().keys({
        name: validate.reqstring,
        startDate: validate.reqDate,
        description: validate.reqstring,
        technology_skills: validate.reqstring,
    }),
    assigned_project_schema: joi.object().keys({
        project: validate.reqstring,
        user: validate.reqstring,
        startDate: validate.date,
        endDate: validate.date,
        project_category: validate.reqstring,
    }),
    loginSchema: joi.object().keys({
        password: validate.password,
        email: validate.email
    }),
    daily_task_schema: joi.object().keys({
        user: validate.reqId,
        project: validate.reqId,
        project_category: validate.id,
        date: validate.date,
        hours: validate.reqNumber,
        minutes: validate.reqNumber,
        description: validate.reqstring,
    }),
    leaveStatusSchema: joi.object().keys({
        name: validate.reqstring
    }),
    leaveTypeSchema: joi.object().keys({
        name: validate.reqstring
    }),
    // mealPlanSchema: joi.object().keys({
    //     clientId: validate.reqId,
    //     breakFast: validate.reqstring,
    //     morningSnack: validate.reqstring,
    //     lunch: validate.reqstring,
    //     eveningSnack: validate.reqstring,
    //     dinner: validate.reqstring,
    //     date:validate.date
    // }),
    // exercisesSchema: joi.object().keys({
    //     exercisesName: validate.reqstring,
    //     muscles: validate.reqstring,
    //     description: validate.reqstring,
    //     videoLink: validate.reqstring
    // }),
    // workOutSchema: joi.object().keys({
    //     client_id: validate.reqId,
    //     trainer_id :validate.reqId,
    //     workOut :validate.reqstring,
    //     date: validate.date
    // }),
    // unitSchema: joi.object().keys({
    //     unit: validate.reqstring,
    // }),
    // bodyPartSchema: joi.object().keys({
    //     unitId: validate.reqId,
    //     bodyPart: validate.reqstring,
    // }),
    // measurmentSchema: joi.object().keys({
    //     bodyPartId: validate.reqId,
    //     date: validate.date,
    //     unitValue: validate.number
    // })
}