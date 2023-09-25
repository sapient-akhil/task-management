const otpModel = require("./otp.model")
const usersModel = require("../../services/users/users.model")

module.exports = {
    createOtp: async (req_data) => {
        return new Promise(async (resolve) => {
            await otpModel.insertMany({ ...req_data });
            return resolve(
                await otpModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    findbyOtpAndEmail: async (email, otp) => {
        return new Promise(async (resolve) => {
            return resolve(
                await otpModel.findOne(
                    { email, otp },
                )
            )
        });
    },
    upadtePassword: async (email, req_data) => {
        return new Promise(async (resolve) => {
            await usersModel.updateOne({ email }, { ...req_data }, { new: true });
            return resolve(
                await usersModel.findOne(
                    { email },
                    { __v: 0 }
                )
            );
        })
    }
}