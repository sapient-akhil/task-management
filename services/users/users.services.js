const usersModel = require("./users.model")
const projectionFields = { __v: 0 }

module.exports = {
    findbyEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { email },
                    projectionFields
                )
                    .populate("designation", projectionFields)
                    .populate("user_role", projectionFields)
                    .populate("technology_skills", projectionFields)
            )
        });
    },
    findbyphoneNumber: async (phoneNumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { phoneNumber },
                    projectionFields
                )
            );
        });
    },
    findAllData: async (page, pageSize, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.find(
                    search ? {
                        active: true,
                        $or:
                            [
                                { name: { $regex: search, $options: 'i' } },
                                { email: { $regex: search, $options: 'i' } },
                                { phoneNumber: { $regex: search, $options: 'i' } }
                            ]
                    } : { active: true }, projectionFields)
                    .populate("designation", projectionFields)
                    .populate("user_role", projectionFields)
                    .populate("technology_skills", projectionFields)
                    .limit(pageSize * 1)
                    .skip((page - 1) * pageSize)
            )
        });
    },
    emailphoneNumber: async (email, phoneNumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { email, phoneNumber },
                    projectionFields
                )
            );
        });
    },
    existData: async (id, email, phoneNumber, emergencyContact, aadharCard, bankAccountNumber, ifscCode, panCard, username) => {
        return new Promise(async (resolve) => {
            const existeEmail = await usersModel.countDocuments({ _id: { $nin: [id] }, email })
            console.log("existeEmail", existeEmail)
            if (existeEmail) {
                return resolve({
                    status: false,
                    message: "email already exist"
                });
            };
            const existphoneNumber = await usersModel.countDocuments({ _id: { $nin: [id] }, phoneNumber })
            if (existphoneNumber) {
                return resolve({
                    status: false,
                    message: "phoneNumber already exist"
                });
            };
            const existemergencyContact = await usersModel.countDocuments({ _id: { $nin: [id] }, emergencyContact })
            if (existemergencyContact) {
                return resolve({
                    status: false,
                    message: "emergencyContact already exist"
                });
            };
            const existaadharCard = await usersModel.countDocuments({ _id: { $nin: [id] }, aadharCard })
            if (existaadharCard) {
                return resolve({
                    status: false,
                    message: "aadharCard already exist"
                });
            };
            const existebankAccountNumber = await usersModel.countDocuments({ _id: { $nin: [id] }, bankAccountNumber })
            if (existebankAccountNumber) {
                return resolve({
                    status: false,
                    message: "bankAccountNumber already exist"
                });
            };
            const existeifscCode = await usersModel.countDocuments({ _id: { $nin: [id] }, ifscCode })
            if (existeifscCode) {
                return resolve({
                    status: false,
                    message: "ifscCode already exist"
                });
            };
            const existepanCard = await usersModel.countDocuments({ _id: { $nin: [id] }, panCard })
            if (existepanCard) {
                return resolve({
                    status: false,
                    message: "panCard already exist"
                });
            };
            const existeusername = await usersModel.countDocuments({ _id: { $nin: [id] }, username })
            if (existeusername) {
                return resolve({
                    status: false,
                    message: "username already exist"
                });
            }
            if (!existemergencyContact && !existaadharCard && !existebankAccountNumber && !existeifscCode && !existepanCard && !existeusername) {
                return resolve({
                    status: true,
                    message: "all not exist"
                });
            }
        });
    },
    findByUsersId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { _id },
                    projectionFields
                )
                    .populate("designation", projectionFields)
                    .populate("user_role", projectionFields)
                    .populate("technology_skills", projectionFields)
            );
        });
    },
    createUsersData: async (req_data) => {
        return new Promise(async (resolve) => {
            await usersModel.insertMany({ ...req_data });
            return resolve(
                await usersModel.find(
                    { ...req_data },
                    projectionFields
                )
            );
        });
    },
    updateUsersData: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await usersModel.findByIdAndUpdate({ _id }, { ...req_data }, { new: true });
            return resolve(
                await usersModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    deleteUsersData: async (_id) => {
        return new Promise(async (resolve) => {
            await usersModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await usersModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
}