const createError = require("http-errors");
const { assignedProjectServices } = require("../../services/index");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  allAssignedProject: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1);
      const pageSize = parseInt(req.query.pageSize || 3);

      let user = req.query?.user;
      user = new ObjectId(user);

      // let filter = { active: true };

      console.log("user", user);
      const allAssignedProject =
        await assignedProjectServices.findAllAssignedProjectForUser(
          user,
          page, 
          pageSize
        );

      console.log("allAssignedProject", allAssignedProject);
      if (!allAssignedProject.length)
        throw createError.NotFound("Projects Not Assigned Yet");

      const total = await assignedProjectServices.countAssignedProject(user);
      const pageCount = Math.ceil(total / pageSize);

      res.status(201).send({
        success: true,
        message: "All assigned project is fetch successfully.",
        data: allAssignedProject,
        meta: {
          pagination: {
            page,
            pageSize, 
            pageCount,
            total : allAssignedProject[0]?.assignedProjects?.length
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  oneAssignedProject: async (req, res, next) => {
    try {
      const { id } = req.params;

      const assignedProject =
        await assignedProjectServices.findByAssignedProjectId(id);
      if (!assignedProject)
        throw createError.NotFound(
          "The assigned project with the provided ID could not be found. Please ensure the ID is correct and try again"
        );

      res.status(201).send({
        success: true,
        message: "One assigned project is fetch successfully.",
        data: assignedProject,
      });
    } catch (error) {
      next(error);
    }
  },
};
