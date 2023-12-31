const usersModel = require("./users.model")

module.exports = {
    findAllData: async (employeeId, page, pageSize) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.aggregate(
                    [
                        {
                            $match: { user_role: employeeId, active: true }
                        },
                        {
                            $lookup: {
                                from: "designations",
                                localField: "designation",
                                foreignField: "_id",
                                as: "designationName",
                            },
                        },
                        {
                            $lookup: {
                                from: "roles",
                                localField: "user_role",
                                foreignField: "_id",
                                as: "roles",
                            },
                        },
                        {
                            $lookup: {
                                from: "technologyskills",
                                localField: "technology_skills",
                                foreignField: "_id",
                                as: "technologySkillsName",
                            },
                        },
                        {
                            $project: {
                                _id: 1, username: 1, email: 1, name: 1, phoneNumber: 1, active: 1,
                                designationId: { $arrayElemAt: ["$designationName._id", 0] },
                                designationName: { $arrayElemAt: ["$designationName.designation", 0] },
                                roleId: { $arrayElemAt: ["$roles._id", 0] },
                                role: { $arrayElemAt: ["$roles.role", 0] }, profilePhoto: 1,
                                "technologySkillsName._id": 1, "technologySkillsName.technology_skills": 1
                            }
                        },
                    ])
                    .sort({ joinDate: -1 })
                    .skip((page - 1) * pageSize)
                    .limit(pageSize * 1)
            )
        });
    },
    createUsersData: async (req_data) => {
        return new Promise(async (resolve) => {
            await usersModel.insertMany({ ...req_data });
            return resolve(
                await usersModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    countUsers: async (employeeId) => {
        return new Promise(async (resolve) => {
            console.log("employeeId", employeeId)
            return resolve(
                await usersModel.countDocuments({ user_role: employeeId, active: true })
            )
        });
    },
    findbyEmail: async (email) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { email },
                    { __v: 0 }
                )
                    .populate("designation", { __v: 0 })
                    .populate("user_role", { __v: 0 })
                    .populate("technology_skills", { __v: 0 })
            )
        });
    },
    findbyphoneNumber: async (phoneNumber) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { phoneNumber },
                    { __v: 0 }
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
                    message: "Email Already Exist"
                });
            };
            const existphoneNumber = await usersModel.countDocuments({ _id: { $nin: [id] }, phoneNumber })
            if (existphoneNumber) {
                return resolve({
                    status: false,
                    message: "Phone Number Aready Exist"
                });
            };
            const existemergencyContact = await usersModel.countDocuments({ _id: { $nin: [id] }, emergencyContact })
            if (existemergencyContact) {
                return resolve({
                    status: false,
                    message: "Emergency Contact Already Exist"
                });
            };
            const existaadharCard = await usersModel.countDocuments({ _id: { $nin: [id] }, aadharCard })
            if (existaadharCard) {
                return resolve({
                    status: false,
                    message: "Aadhar Card Already Exist"
                });
            };
            const existebankAccountNumber = await usersModel.countDocuments({ _id: { $nin: [id] }, bankAccountNumber })
            if (existebankAccountNumber) {
                return resolve({
                    status: false,
                    message: "Bank Account Number already exist"
                });
            };
            const existeifscCode = await usersModel.countDocuments({ _id: { $nin: [id] }, ifscCode })
            if (existeifscCode) {
                return resolve({
                    status: false,
                    message: "ifsc Code aAready Exist"
                });
            };
            const existepanCard = await usersModel.countDocuments({ _id: { $nin: [id] }, panCard })
            if (existepanCard) {
                return resolve({
                    status: false,
                    message: "Pan Card Already Exist"
                });
            };
            const existeusername = await usersModel.countDocuments({ _id: { $nin: [id] }, username })
            if (existeusername) {
                return resolve({
                    status: false,
                    message: "Username Already Exist"
                });
            }
            if (!existemergencyContact && !existaadharCard && !existebankAccountNumber && !existeifscCode && !existepanCard && !existeusername) {
                return resolve({
                    status: true,
                    message: "All Data Is Not Exist"
                });
            }
        });
    },
    findByUsersId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { _id },
                    { __v: 0 }
                )
                    .populate("designation", { __v: 0 })
                    .populate("user_role", { __v: 0 })
                    .populate("technology_skills", { __v: 0 })
            );
        });
    },
    findByUsersIdByuser: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await usersModel.findOne(
                    { _id },
                    { _id: 1, username: 1, email: 1, name: 1, phoneNumber: 1, designation: 1, user_role: 1, technology_skills: 1, active: 1 }
                )
                    .populate("designation", { __v: 0 })
                    .populate("user_role", { __v: 0 })
                    .populate("technology_skills", { __v: 0 })
            );
        });
    },
    updateUsersData: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await usersModel.findByIdAndUpdate({ _id }, { ...req_data }, { new: true });
            return resolve(
                await usersModel.findOne(
                    { _id },
                    { __v: 0 }
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
                    { __v: 0 }
                )
            );
        });
    },
    // addManyUsersData: async (req_data) => {
    //     return new Promise(async (resolve) => {
    //         await usersModel.insertMany(req_data);
    //         return resolve(
    //             await usersModel.find(
    //                 {},
    //                 { __v: 0 }
    //             )
    //         );
    //     });
    // },

    // findAllData: async (employeeId, page, pageSize, search) => {
    //     return new Promise(async (resolve) => {
    //         return resolve(
    //             await usersModel.find(
    //                 search ? {
    //                     active: true,
    //                     user_role: employeeId,
    //                     $or:
    //                         [
    //                             { name: { $regex: search, $options: 'i' } },
    //                             { email: { $regex: search, $options: 'i' } },
    //                             { phoneNumber: { $regex: search, $options: 'i' } }
    //                         ]
    //                 } : { active: true, user_role: employeeId }, { _id: 1, username: 1, email: 1, name: 1, phoneNumber: 1, designation: 1, user_role: 1, technology_skills: 1, active: 1 })
    //                 .populate("designation", { __v: 0 })
    //                 .populate("user_role", { __v: 0 })
    //                 .populate("technology_skills", { __v: 0 })
    //                 .sort({ joinDate: -1 })
    //                 .skip((page - 1) * pageSize)
    //                 .limit(pageSize * 1)
    //         )
    //     });
    // },
}