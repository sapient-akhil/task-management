const joi = require("joi");
const objectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const leaveStatus = ["approved", "rejected", "pending"]

module.exports = {
    reqId: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID...").required(),
    id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
    reqstring: joi.string().required(),
    string: joi.string(),
    leaveStatus: joi.string().valid(...leaveStatus),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required(),
    reqDate: joi.date().required(),
    date: joi.date(),
    number: joi.number(),
    reqNumber: joi.number().required(),
    password: joi.string().min(5).message("password lenght more than 5 characters").required(),
    boolean: joi.boolean()
}