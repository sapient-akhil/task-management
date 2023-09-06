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
const technology_skills_controller = require("../controller/users/technology_skills")

router.get("/technology_skills", verifyAccessTokenforUsersAdmin, technology_skills_controller.all_technology_skills)
router.get("/technology_skills/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), technology_skills_controller.one_technology_skills)

// project_category routes
const project_category_controller = require("../controller/users/project_category")

router.get("/project_category", verifyAccessTokenforUsersAdmin, project_category_controller.all_project_category)
router.get("/project_category/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), project_category_controller.one_project_category)

// projects routes
const projectsController = require("../controller/users/projects")

router.get("/projects", verifyAccessTokenforUsersAdmin, projectsController.allProjects)
router.get("/projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectsController.oneProjects)

// assigned_project routes
const assigned_project_controller = require("../controller/users/assigned_project")

router.get("/assigned_projects", verifyAccessTokenforUsersAdmin, assigned_project_controller.all_assigned_project)
router.get("/assigned_projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), assigned_project_controller.one_assigned_project)

// daily_task routes
const daily_task_controller = require("../controller/users/daily_task")

router.post("/daily_tasks", verifyAccessTokenforUser, Validators.forReqBody(Schema.daily_task_schema), daily_task_controller.create_daily_task)
router.post("/get_daily_tasks", verifyAccessTokenforUsersAdmin, daily_task_controller.all_daily_task)
router.get("/daily_tasks/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), daily_task_controller.one_daily_task)

// leaveStatus routes
const leaveStatuscontroller = require("../controller/users/leaveStatus")

router.get("/leave-status", verifyAccessTokenforUsersAdmin, leaveStatuscontroller.allLeaveStatus)
router.get("/leave-status/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveStatuscontroller.oneLeaveStatus)

// leaveType routes
const leaveTypecontroller = require("../controller/users/leaveType")

router.get("/leave-type", verifyAccessTokenforUsersAdmin, leaveTypecontroller.allLeaveType)
router.get("/leave-type/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveTypecontroller.oneLeaveType)

module.exports = router;

