const joi = require("joi");
const validate = require("../validation/joivalidation")

module.exports = {
    employeeSchema: joi.object().keys({
        username: validate.reqstring,
        email: validate.email,
        name: validate.reqstring,
        address: validate.reqstring,
        birthDate: validate.date,
        joinDate: validate.date,
        probationDate: validate.date,
        appraisalDate: validate.date,
        phoneNumber: validate.reqstring,
        emergencyContact: validate.reqstring,
        aadharCard: validate.number,
        panCard: validate.reqstring,
        bankName: validate.reqstring,
        bankAccountNumber: validate.number,
        ifscCode: validate.reqstring,
        nameAsPerBank: validate.reqstring,
        pastExperience: validate.reqNumber,
        experienceWithUS: validate.reqNumber,
        totalExperience: validate.reqNumber,
        ctc: validate.number,
        profilePhoto: validate.string,
        designation: validate.id,
        user_role: validate.id,
        technology_skills: validate.string,
        password: validate.password
    }),
    role: joi.object().keys({
        role: validate.reqstring
    }),
    designation: joi.object().keys({
        designation: validate.reqstring
    }),
    technology_skills: joi.object().keys({
        technology_skills: validate.reqstring
    }),
    params: joi.object().keys({
        id: validate.reqId
    }),
    // bodyPartId: joi.object().keys({
    //     bodyPartId: validate.reqId
    // }), 
    // bodyPartByDate: joi.object().keys({
    //     startDate:validate.date,
    //     endDate:validate.date
    // }),
    employeeLogin: joi.object().keys({
        password: validate.password,
        email: validate.email
    }),
    // clientLoginSchema: joi.object().keys({
    //     password: validate.reqstring,
    //     email: validate.email
    // }),
    // clientSchema: joi.object().keys({
    //     name: validate.reqstring,
    //     address: validate.reqstring,
    //     mobilenumber: validate.reqstring,
    //     email: validate.email,
    //     password: validate.password,
    // }),
    // mealItemSchema: joi.object().keys({
    //     trainer_id: validate.id,
    //     mealItem: validate.reqstring,
    //     calary: validate.reqstring,
    //     description: validate.reqstring,
    //     ingredients: validate.reqstring
    // }),
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