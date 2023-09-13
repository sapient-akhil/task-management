const express = require("express");
const router = express.Router();
const Schema = require("../helper/schema")
const Validators = require("../helper/validation")
const { verifyAccessTokenforUsersAdmin, verifyAccessTokenforUser } = require("../helper/verify.token")

//admin routes
const usersController = require("../controller/users/users")

router.get("/users", verifyAccessTokenforUsersAdmin, usersController.allUsers)
router.get("/users/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), usersController.oneUsers)

//roledata routes
const roleController = require("../controller/users/role")

router.get("/roles", verifyAccessTokenforUsersAdmin, roleController.allRole)
router.get("/roles/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), roleController.oneRole)

//designationData routes
const designationController = require("../controller/users/designation")

router.get("/designations", verifyAccessTokenforUsersAdmin, designationController.allDesignation)
router.get("/designations/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), designationController.oneDesignation)

// technology_skills routes
const technologySkillsController = require("../controller/users/technologySkills")

router.get("/technology-skills", verifyAccessTokenforUsersAdmin, technologySkillsController.allTechnologySkills)
router.get("/technology-skills/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), technologySkillsController.oneTechnologySkills)

// project_category routes
const projectCategoryController = require("../controller/users/projectCategory")

router.get("/project-category", verifyAccessTokenforUsersAdmin, projectCategoryController.allProjectCategory)
router.get("/project-category/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectCategoryController.oneProjectCategory)

// projects routes
const projectsController = require("../controller/users/projects")

router.get("/projects", verifyAccessTokenforUsersAdmin, projectsController.allProjects)
router.get("/projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectsController.oneProjects)

// assigned_project routes
const assignedProjectController = require("../controller/users/assignedProject")

router.get("/assigned-projects", verifyAccessTokenforUsersAdmin, assignedProjectController.allAssignedProject)
router.get("/assigned-projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), assignedProjectController.oneAssignedProject)

// daily_task routes
const dailyTaskController = require("../controller/users/dailyTask")

router.post("/daily-tasks", verifyAccessTokenforUser, Validators.forReqBody(Schema.dailyTaskSchema), dailyTaskController.createDailyTask)
router.post("/get-daily-tasks", verifyAccessTokenforUsersAdmin, dailyTaskController.allDailyTask)
router.get("/daily-tasks/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), dailyTaskController.oneDailyTask)

// leaveStatus routes
const leaveStatusController = require("../controller/users/leaveStatus")

router.get("/leave-status", verifyAccessTokenforUsersAdmin, leaveStatusController.allLeaveStatus)
router.get("/leave-status/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveStatusController.oneLeaveStatus)

// leaveType routes
const leaveTypeController = require("../controller/users/leaveType")

router.get("/leave-type", verifyAccessTokenforUsersAdmin, verifyAccessTokenforUsersAdmin, leaveTypeController.allLeaveType)
router.get("/leave-type/:id", verifyAccessTokenforUsersAdmin, verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveTypeController.oneLeaveType)

// leave routes
const leaveController = require("../controller/users/leave")

router.post("/leave", verifyAccessTokenforUser, Validators.forReqBody(Schema.leaveSchema), leaveController.createLeave)
router.post("/get-leave", verifyAccessTokenforUsersAdmin, leaveController.allLeave)
router.get("/leave/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveController.oneLeave)

module.exports = router;

