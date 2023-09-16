const quickLinksModel = require("./quickLinks.model")

module.exports = {
    findAllQuickLinks: async () => {
        return new Promise(async (resolve) => {
            return resolve(
                await quickLinksModel.find({ active: true }, { __v: 0 }).sort({ createdAt: -1 })
            )
        });
    },
    findByQuickLinksId: async (_id) => {
        return new Promise(async (resolve) => {
            return resolve(
                await quickLinksModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    findQuickLinks: async (link, name) => {
        return new Promise(async (resolve) => {
            return resolve(
                await quickLinksModel.findOne(
                    { link,name },
                    { __v: 0 }
                )
            )
        });
    },
    createQuickLinks: async (req_data) => {
        return new Promise(async (resolve) => {
            await quickLinksModel.insertMany({ ...req_data });
            return resolve(
                await quickLinksModel.find(
                    { ...req_data },
                    { __v: 0 }
                )
            );
        });
    },
    updateQuickLinks: async (_id, req_data) => {
        return new Promise(async (resolve) => {
            await quickLinksModel.findByIdAndUpdate({ _id }, { ...req_data });
            return resolve(
                await quickLinksModel.find(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    },
    deleteQuickLinks: async (_id) => {
        return new Promise(async (resolve) => {
            await quickLinksModel.updateOne({ _id }, { active: false }, { new: true });
            return resolve(
                await quickLinksModel.findOne(
                    { _id },
                    { __v: 0 }
                )
            );
        });
    }
}