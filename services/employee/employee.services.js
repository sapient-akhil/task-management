const employeeModel = require("./employee.model")
const projectionFields = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }

module.exports = {
    findbyEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await employeeModel.findOne(
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
                await employeeModel.findOne(
                    { phoneNumber },
                    projectionFields
                )
            );
        });
    },
    findAllData: async (page, pageSize, search) => {
        return new Promise(async (resolve) => {
            return resolve(
                await employeeModel.find(
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
                await employeeModel.findOne(
                    { email, phoneNumber },
                    projectionFields
                )
            );
        });
    },
    existData: async (emergencyContact, aadharCard, bankAccountNumber, ifscCode, panCard, username) => {
        return new Promise(async (resolve) => {

            var existemergencyContact = await employeeModel.countDocuments({ emergencyContact })
            if (existemergencyContact) {
                return resolve({
                    status: false,
                    message: "emergencyContact already exist"
                });
            };
            var existaadharCard = await employeeModel.countDocuments({ aadharCard })
            if (existaadharCard) {
                return resolve({
                    status: false,
                    message: "aadharCard already exist"
                });
            };
            var existebankAccountNumber = await employeeModel.countDocuments({ bankAccountNumber })
            if (existebankAccountNumber) {
                return resolve({
                    status: false,
                    message: "bankAccountNumber already exist"
                });
            };
            var existeifscCode = await employeeModel.countDocuments({ ifscCode })
            if (existeifscCode) {
                return resolve({
                    status: false,
                    message: "ifscCode already exist"
                });
            };
            var existepanCard = await employeeModel.countDocuments({ panCard })
            if (existepanCard) {
                return resolve({
                    status: false,
                    message: "panCard already exist"
                });
            };
            var existeusername = await employeeModel.countDocuments({ username })
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
            };
        });
    },
    findByEmployeeId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await employeeModel.findOne(
                    { _id },
                    projectionFields
                )
                .populate("designation", projectionFields)
                    .populate("user_role", projectionFields)
                    .populate("technology_skills", projectionFields) 
            );
        });
    },
    createUpdateEmployeeData: async (email, phoneNumber, req_data) => {
        return new Promise(async (resolve) => {
            await employeeModel.updateOne({ email, phoneNumber }, { ...req_data }, { upsert: true });
            return resolve(
                await employeeModel.find(
                    { email, phoneNumber },
                    projectionFields
                )
            );
        });
    },
    deleteEmployeeData: async (_id) => {
        return new Promise(async (resolve) => {
            await employeeModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await employeeModel.findOne(
                    { _id },
                    projectionFields
                )
            );
        });
    },
    // findSuperAdminExistOrNOt: async () => {
    //     return new Promise(async (resolve) => {
    //         return resolve(await employeeModel.countDocuments({ role: "superadmin" }));
    //     });
    // },
    // createUpdateSuperAdmin: async (email, phoneNumber, req_data) => {
    //     return new Promise(async (resolve) => {
    //         await employeeModel.updateOne({ "contactdetails.email": email, "contactdetails.phoneNumber": phoneNumber }, { role: "superadmin", ...req_data }, { upsert: true });
    //         return resolve(
    //             await employeeModel.find(
    //                 { "contactdetails.email": email, "contactdetails.phoneNumber": phoneNumber },
    //                 projectionFields
    //             )
    //         );
    //     });
    // }
}