const leaveModel = require("./leave.model");

module.exports = {
  findAllLeave: async (filter, page) => {
    return new Promise(async (resolve) => {
      // console.log("filter", filter)
      // console.log("user", user)

      return resolve(
        await leaveModel
          .find(filter)
          .populate("leaveType", { __v: 0 })
          // .populate("leaveStatus", { __v: 0 })
          .populate({
            path: "user",
            populate: [
              {
                path: "technology_skills",
              },
              {
                path: "user_role",
              },
              {
                path: "designation",
              },
            ],
            select:
              "_id username email name phoneNumber designation user_role technology_skills active",
          })
          .sort({ fromDate: -1 })
          .skip((page.page_no - 1) * page.page_per)
          .limit(page.page_per * 1)
      );
    });
  },
  findAllTodayOnLeaveUser: async () => {
    return new Promise(async (resolve) => {
      const allLeaveUser = await leaveModel
        .find(
          { active: true },
          {
            _id: 0,
            reason: 0,
            totalLeave: 0,
            leaveType: 0,
            leaveStatus: 0,
            active: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          }
        )
        .populate("user", { name: 1, _id: 1 });

      const targetDate = new Date();
      targetDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

      // Filter leave records for the target date
      const leaveOnTargetDate = allLeaveUser.filter((leave) => {
        const fromDate = new Date(leave.fromDate);
        fromDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
        const toDate = new Date(leave.toDate);
        toDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
        return targetDate >= fromDate && targetDate <= toDate;
      });
      return resolve(leaveOnTargetDate);
    });
  },
  createLeave: async (req_data) => {
    return new Promise(async (resolve) => {
      await leaveModel.insertMany({ ...req_data });
      return resolve(await leaveModel.find({ ...req_data }, { __v: 0 }));
    });
  },
  findByLeaveId: async (_id) => {
    return new Promise(async (resolve) => {
      return resolve(
        await leaveModel
          .findOne({ _id }, { __v: 0 })
          .populate("leaveType", { __v: 0 })
          // .populate("leaveStatus", { __v: 0 })
          .populate({
            path: "user",
            populate: {
              path: "technology_skills",
              model: "technologySkills",
            },
          })
          .populate({
            path: "user",
            populate: {
              path: "user_role",
              model: "role",
            },
          })
          .populate({
            path: "user",
            populate: {
              path: "designation",
              model: "designation",
            },
          })
      );
    });
  },
  countLeave: async (filter) => {
    return new Promise(async (resolve) => {
      // console.log("countLeave", filter)
      return resolve(await leaveModel.countDocuments(filter));
    });
  },
  // addManycreateLeave: async (req_data) => {
  //     return new Promise(async (resolve) => {
  //         await leaveModel.insertMany(req_data);
  //         return resolve(
  //             await leaveModel.find(
  //                 {},
  //                 { __v: 0 }
  //             )
  //         );
  //     });
  // },
  updateLeave: async (_id, req_data) => {
    return new Promise(async (resolve) => {
      await leaveModel.findByIdAndUpdate({ _id }, { ...req_data });
      return resolve(await leaveModel.find({ _id }, { __v: 0 }));
    });
  },
  deleteLeave: async (_id) => {
    return new Promise(async (resolve) => {
      await leaveModel.updateOne({ _id }, { active: false }, { new: true });
      return resolve(await leaveModel.findOne({ _id }, { __v: 0 }));
    });
  },
};
