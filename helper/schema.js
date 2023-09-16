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
        phoneNumber: validate.reqNumber,
        emergencyContact: validate.reqNumber,
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
        password: validate.reqPassword,
        profilePhoto: validate.string
    }),
    updateUsersSchema: joi.object().keys({
        username: validate.reqstring,
        email: validate.email,
        name: validate.reqstring,
        address: validate.reqstring,
        birthDate: validate.reqDate,
        joinDate: validate.reqDate,
        probationDate: validate.reqDate,
        appraisalDate: validate.reqDate,
        phoneNumber: validate.reqNumber,
        emergencyContact: validate.reqNumber,
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
    technologySkillsSchema: joi.object().keys({
        technology_skills: validate.reqstring
    }),
    params: joi.object().keys({
        id: validate.reqId
    }),
    projectCategorySchema: joi.object().keys({
        name: validate.reqstring
    }),
    projectsSchema: joi.object().keys({
        name: validate.reqstring,
        startDate: validate.reqDate,
        description: validate.reqstring,
        // technology_skills: validate.reqstring,
        deployed: validate.boolean
    }),
    assignedProjectSchema: joi.object().keys({
        project: validate.reqstring,
        user: validate.reqstring,
        startDate: validate.date,
        endDate: validate.date,
        project_category: validate.reqstring,
    }),
    loginSchema: joi.object().keys({
        password: validate.reqPassword,
        email: validate.email
    }),
    dailyTaskSchema: joi.object().keys({
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
    leaveSchema: joi.object().keys({
        totalLeave: validate.reqNumber,
        reason: validate.reqstring,
        fromDate: validate.reqDate,
        toDate: validate.reqDate,
        leaveType: validate.reqId,
        leaveStatus: validate.leaveStatus,
        user: validate.reqId
    }),
    quickLinksSchema: joi.object().keys({
        name: validate.reqstring,
        link: validate.reqstring,
    })
}