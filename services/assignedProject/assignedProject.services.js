const assignedProjectModel = require("./assignedProject.model");
const dailyTaskModel = require("../dailyTask/dailyTask.model");

module.exports = {
  findAllAssignedProject: async (filter, page, pageSize) => {
    return new Promise(async (resolve) => {
      return resolve(
        await assignedProjectModel
          .aggregate([
            {
              $match: { active: true },
            },
            {
              $unwind: "$project",
            },
            { $match: { $expr: { $and: filter } } },
            {
              $group: {
                _id: {
                  projectId: "$project",
                  user: "$user",
                },
                startDate: { $first: "$startDate" },
                endDate: { $first: "$endDate" },
                project_category: { $first: "$project_category" },
                user: { $first: "$user" },
                project: { $first: "$project" },
                assigProject_id: { $first: "$_id" },
              },
            },
            { $match: { $expr: { $and: "$_id.user" } } },
            {
              $lookup: {
                from: "dailytasks",
                let: {
                  projectId: "$_id.projectId",
                  userId: "$_id.user",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$project", "$$projectId"] },
                          { $eq: ["$user", "$$userId"] },
                        ],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: {
                        project: "$project",
                        user: "$user",
                      },
                      totalHour: { $sum: "$hours" },
                      totalMinutes: { $sum: "$minutes" },
                    },
                  },
                  {
                    $addFields: {
                      totalHour: {
                        $add: [
                          "$totalHour",
                          {
                            $floor: {
                              $divide: ["$totalMinutes", 60],
                            },
                          },
                        ],
                      },
                      totalMinutes: {
                        $mod: ["$totalMinutes", 60],
                      },
                    },
                  },
                ],
                as: "data",
              },
            },
            {
              $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "projectName",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userName",
              },
            },
            {
              $match: { "userName.active": true },
            },
            {
              $lookup: {
                from: "projectcategories",
                localField: "project_category",
                foreignField: "_id",
                as: "projectCategoryName",
              },
            },
            {
              $project: {
                startDate: 1,
                endDate: 1,
                assigProject_id: 1,
                _id: 1,
                "data.totalHour": 1,
                "data.totalMinutes": 1,
                "projectName.name": 1,
                "userName.name": 1,
                "projectName.name": 1,
                "projectName._id": 1,
                "userName.name": 1,
                "userName._id": 1,
                "projectCategoryName.name": 1,
                "projectCategoryName._id": 1,
              },
            },
            {
              $group: {
                _id: {
                  userId: "$_id.user",
                  name: { $arrayElemAt: ["$userName.name", 0] },
                },
                assignedProjects: {
                  $push: {
                    // projectId: "$_id.projectId",
                    // name: "$projectName.name", // Include the project name
                    totalHour: { $arrayElemAt: ["$data.totalHour", 0] }, // Use the renamed fields
                    totalMinutes: { $arrayElemAt: ["$data.totalMinutes", 0] },
                    startDate: "$startDate",
                    endDate: "$endDate",
                    projectName: { $arrayElemAt: ["$projectName", 0] },
                    // userName:"$userName",
                    projectCategoryName: "$projectCategoryName",
                    assigProject_id: "$assigProject_id",
                  },
                },
                totalHour: {
                  $sum: { $arrayElemAt: ["$data.totalHour", 0] },
                },
                totalMinutes: {
                  $sum: { $arrayElemAt: ["$data.totalMinutes", 0] },
                },
              },
            },
            {
              $addFields: {
                totalHour: {
                  $add: [
                    "$totalHour",
                    {
                      $floor: {
                        $divide: ["$totalMinutes", 60],
                      },
                    },
                  ],
                },
                totalMinutes: {
                  $mod: ["$totalMinutes", 60],
                },
              },
            },
            {
              $project: {
                _id: 1,
                assignedProjects: {
                  $sortArray: {
                    input: "$assignedProjects",
                    sortBy: { "projectName.name": 1 },
                  },
                },
              },
            },
            {
              $sort: { "_id.name": 1 },
            },
          ])
          // .sort({ user: 1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize * 1)
      );
    });
  },
  findAllAssignedProjectForUser: async (id, page, pageSize) => {
    return new Promise(async (resolve) => {
      return resolve(
        await assignedProjectModel
          .aggregate([
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$user", id] }, { $eq: ["$active", true] }],
                },
              },
            },
            {
              $unwind: "$project",
            },
            {
              $group: {
                _id: {
                  projectId: "$project",
                  user: "$user",
                },
                startDate: { $first: "$startDate" },
                endDate: { $first: "$endDate" },
                project_category: { $first: "$project_category" },
              },
            },
            { $match: { $expr: { $and: "$_id.user" } } },
            {
              $lookup: {
                from: "dailytasks",
                let: {
                  projectId: "$_id.projectId",
                  userId: "$_id.user",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$project", "$$projectId"] },
                          { $eq: ["$user", "$$userId"] },
                        ],
                      },
                    },
                  },
                  {
                    $group: {
                      _id: {
                        project: "$project",
                        user: "$user",
                      },
                      totalHour: { $sum: "$hours" },
                      totalMinutes: { $sum: "$minutes" },
                    },
                  },
                  {
                    $addFields: {
                      totalHour: {
                        $add: [
                          "$totalHour",
                          {
                            $floor: {
                              $divide: ["$totalMinutes", 60],
                            },
                          },
                        ],
                      },
                      totalMinutes: {
                        $mod: ["$totalMinutes", 60],
                      },
                    },
                  },
                ],
                as: "data",
              },
            },
            {
              $lookup: {
                from: "projects",
                localField: "_id.projectId",
                foreignField: "_id",
                as: "projectName",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userName",
              },
            },
            {
              $lookup: {
                from: "projectcategories",
                localField: "project_category",
                foreignField: "_id",
                as: "projectCategoryName",
              },
            },
            {
              $project: {
                startDate: 1,
                endDate: 1,
                assigProject_id: 1,
                _id: 1,
                "data.totalHour": 1,
                "data.totalMinutes": 1,
                "projectName.name": 1,
                "userName.name": 1,
                "projectName.name": 1,
                "projectName._id": 1,
                "userName.name": 1,
                "userName._id": 1,
                "projectCategoryName.name": 1,
                "projectCategoryName._id": 1,
              },
            },
            {
              $group: {
                _id: {
                  userId: "$_id.user",
                  projectId: "$_id.projectId",
                  name: { $arrayElemAt: ["$userName.name", 0] },
                },
                totalHour: { $first: { $arrayElemAt: ["$data.totalHour", 0] } }, // Use the renamed fields
                totalMinutes: {
                  $first: { $arrayElemAt: ["$data.totalMinutes", 0] },
                },
                startDate: { $first: "$startDate" },
                endDate: { $first: "$endDate" },
                projectName: { $first: { $arrayElemAt: ["$projectName", 0] } },
                projectCategoryName: { $first: "$projectCategoryName" },
                assigProject_id: { $first: "$assigProject_id" },
              },
            },
            {
              $project: {
                _id: 0,
                startDate: 1,
                endDate: 1,
                projectName: 1,
                // projectCategoryName: 1,
                totalHour: 1,
                totalMinutes: 1,
              },
            },
            {
              $sort: { projectName: 1 },
            },
          ])
          // .sort({ user: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize * 1)
      );
    });
  },
  allProjectTotalTimeForAdmin: async () => {
    return new Promise(async (resolve) => {
      return resolve(
        await assignedProjectModel.aggregate([
          {
            $match: { active: true },
          },
          {
            $unwind: "$project",
          },
          {
            $group: {
              _id: {
                projectId: "$project",
              },
              project: { $first: "$project" },
            },
          },
          {
            $lookup: {
              from: "dailytasks",
              let: {
                projectId: "$_id.projectId",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [{ $eq: ["$project", "$$projectId"] }],
                    },
                  },
                },
                {
                  $group: {
                    _id: {
                      project: "$project",
                    },
                    totalHour: { $sum: "$hours" },
                    totalMinutes: { $sum: "$minutes" },
                  },
                },
                {
                  $addFields: {
                    totalHour: {
                      $add: [
                        "$totalHour",
                        {
                          $floor: {
                            $divide: ["$totalMinutes", 60],
                          },
                        },
                      ],
                    },
                    totalMinutes: {
                      $mod: ["$totalMinutes", 60],
                    },
                  },
                },
              ],
              as: "time",
            },
          },
          {
            $lookup: {
              from: "projects",
              localField: "project",
              foreignField: "_id",
              as: "projectName",
            },
          },
          {
            $match: {
              "projectName.deployed": false,
            },
          },
          {
            $project: {
              _id: 0,
              projectId: {
                $arrayElemAt: ["$projectName._id", 0],
              },
              projectName: {
                $arrayElemAt: ["$projectName.name", 0],
              },
              totalHour: {
                $arrayElemAt: ["$time.totalHour", 0],
              },
              totalMinutes: {
                $arrayElemAt: ["$time.totalMinutes", 0],
              },
            },
          },
        ])
      );
    });
  },
  allProjectCategoryTotalTimeForAdmin: async () => {
    return new Promise(async (resolve) => {
      return resolve(
        await assignedProjectModel.aggregate([
          {
            $match: { active: true },
          },
          {
            $unwind: "$project",
          },
          {
            $unwind: "$project_category",
          },
          {
            $group: {
              _id: {
                project_category_id: "$project_category",
                projectId: "$project",
              },
              project_category: { $first: "$project_category" },
              project: { $first: "$project" },
            },
          },
          {
            $lookup: {
              from: "dailytasks",
              let: {
                project_category_id: "$_id.project_category_id",
                projectId: "$_id.projectId",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$project_category", "$$project_category_id"] },
                        { $eq: ["$project", "$$projectId"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: {
                      project: "$project_category_id",
                      project: "$project",
                    },
                    totalHour: { $sum: "$hours" },
                    totalMinutes: { $sum: "$minutes" },
                  },
                },
                {
                  $addFields: {
                    totalHour: {
                      $add: [
                        "$totalHour",
                        {
                          $floor: {
                            $divide: ["$totalMinutes", 60],
                          },
                        },
                      ],
                    },
                    totalMinutes: {
                      $mod: ["$totalMinutes", 60],
                    },
                  },
                },
              ],
              as: "time",
            },
          },
          {
            $lookup: {
              from: "projectcategories",
              localField: "project_category",
              foreignField: "_id",
              as: "projectCategoryName",
            },
          },
          {
            $lookup: {
              from: "projects",
              localField: "project",
              foreignField: "_id",
              as: "projectName",
            },
          },
          {
            $match: {
              "projectName.deployed": false,
            },
          },
          {
            $project: {
              _id: 0,
              projectId: {
                $arrayElemAt: ["$projectName._id", 0],
              },
              projectName: {
                $arrayElemAt: ["$projectName.name", 0],
              },
              projectCategoryId: {
                $arrayElemAt: ["$projectCategoryName._id", 0],
              },
              projectCategoryName: {
                $arrayElemAt: ["$projectCategoryName.name", 0],
              },
              totalHour: {
                $arrayElemAt: ["$time.totalHour", 0],
              },
              totalMinutes: {
                $arrayElemAt: ["$time.totalMinutes", 0],
              },
            },
          },
        ])
      );
    });
  },
  createAssignedProject: async (req_data) => {
    return new Promise(async (resolve) => {
      await assignedProjectModel.insertMany({ ...req_data });
      return resolve(
        await assignedProjectModel.find({ ...req_data }, { __v: 0 })
      );
    });
  },
  findByAssignedProjectId: async (_id) => {
    return new Promise(async (resolve) => {
      return resolve(
        await assignedProjectModel
          .findOne({ _id }, { __v: 0 })
          .populate("project")
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
          .populate("project_category", { __v: 0 })
      );
    });
  },
  countAssignedProject: async (filter) => {
    return new Promise(async (resolve) => {
      return resolve(await assignedProjectModel.countDocuments(filter));
    });
  },
  countAssignedProjectForUser: async (id) => {
    try {
      const count = await assignedProjectModel.countDocuments({
        user: id,
        active: true,
      });
      return count;
    } catch (error) {
      throw error;
    }
  },
  totalTime: async (project, user) => {
    try {
      const tasks = await dailyTaskModel.countDocuments({ project, user });
      return tasks;
    } catch (error) {
      throw error;
    }
  },
  // addManyAssignedProject: async (req_data) => {
  //     return new Promise(async (resolve) => {
  //         await assignedProjectModel.insertMany(req_data);
  //         return resolve(
  //             await assignedProjectModel.find(
  //                 {},
  //                 { __v: 0 }
  //             )
  //         );
  //     });
  // },
  updateAssignedProject: async (_id, req_data) => {
    return new Promise(async (resolve) => {
      await assignedProjectModel.findByIdAndUpdate(
        { _id },
        { ...req_data },
        { new: true }
      );
      return resolve(await assignedProjectModel.find({ _id }, { __v: 0 }));
    });
  },
  deleteAssignedProject: async (_id) => {
    return new Promise(async (resolve) => {
      await assignedProjectModel.updateOne(
        { _id },
        { active: false },
        { new: true }
      );
      return resolve(await assignedProjectModel.findOne({ _id }, { __v: 0 }));
    });
  },
};
