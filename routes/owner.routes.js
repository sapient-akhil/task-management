const express = require("express");
const router = express.Router();
const Schema = require("../helper/schema")
const Validators = require("../helper/validation")
const { verifyAccessTokenforOwner, verifyAccessTokenforUsersAdmin } = require("../helper/verify.token")

//admin routes
const usersController = require("../controller/owner/owner")

router.post("/users", verifyAccessTokenforOwner, Validators.forReqBody(Schema.usersSchema), usersController.createUsersByOwner)
router.get("/users", verifyAccessTokenforUsersAdmin, usersController.allUsers)
router.get("/users/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), usersController.oneUsers)
router.delete("/users/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), usersController.deleteUsersByOwner)
router.put("/users/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.usersSchema), usersController.updateUsersByOwner)

//roledata routes
const roleController = require("../controller/owner/role")

router.post("/roles", verifyAccessTokenforOwner, Validators.forReqBody(Schema.roleSchema), roleController.createRole)
router.get("/roles", verifyAccessTokenforUsersAdmin, roleController.allRole)
router.get("/roles/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), roleController.oneRole)
router.put("/roles/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.roleSchema), Validators.forReqBody(Schema.role), roleController.updateRole)
router.delete("/roles/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), roleController.deleteRoleData)

//designationData routes
const designationController = require("../controller/owner/designation")

router.post("/designations", verifyAccessTokenforOwner, Validators.forReqBody(Schema.designationSchema), designationController.createDesignation)
router.get("/designations", verifyAccessTokenforUsersAdmin, designationController.allDesignation)
router.get("/designations/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), designationController.oneDesignation)
router.put("/designations/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.designationSchema), Validators.forReqBody(Schema.designation), designationController.updateDesignation)
router.delete("/designations/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), designationController.deleteDesignation)

// technology_skills routes
const technology_skills_controller = require("../controller/owner/technology_skills")

router.post("/technology_skills", verifyAccessTokenforOwner, Validators.forReqBody(Schema.technology_skills_Schema), technology_skills_controller.create_technology_skills)
router.get("/technology_skills", verifyAccessTokenforUsersAdmin, technology_skills_controller.all_technology_skills)
router.get("/technology_skills/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), technology_skills_controller.one_technology_skills)
router.put("/technology_skills/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.technology_skills_Schema), technology_skills_controller.update_technology_skills)
router.delete("/technology_skills/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), technology_skills_controller.delete_technology_skills)

// project_category routes
const project_category_controller = require("../controller/owner/project_category")

router.post("/project_category", verifyAccessTokenforOwner, Validators.forReqBody(Schema.project_category_Schema), project_category_controller.create_project_category)
router.get("/project_category", verifyAccessTokenforUsersAdmin, project_category_controller.all_project_category)
router.get("/project_category/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), project_category_controller.one_project_category)
router.put("/project_category/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.project_category_Schema), project_category_controller.update_project_category)
router.delete("/project_category/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), project_category_controller.delete_project_category)

// projects routes
const projectsController = require("../controller/owner/projects")

router.post("/projects", verifyAccessTokenforOwner, Validators.forReqBody(Schema.projectsSchema), projectsController.createProjects)
router.get("/projects", verifyAccessTokenforUsersAdmin, projectsController.allProjects)
router.get("/projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectsController.oneProjects)
router.put("/projects/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.projectsSchema), projectsController.updateProjects)
router.delete("/projects/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), projectsController.deleteProjects)

// assigned_project routes
const assigned_project_controller = require("../controller/owner/assigned_project")

router.post("/assigned_projects", verifyAccessTokenforOwner, Validators.forReqBody(Schema.assigned_project_schema), assigned_project_controller.create_assigned_project)
router.get("/assigned_projects", verifyAccessTokenforUsersAdmin, assigned_project_controller.all_assigned_project)
router.get("/assigned_projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), assigned_project_controller.one_assigned_project)
router.put("/assigned_projects/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.assigned_project_schema), assigned_project_controller.update_assigned_project)
router.delete("/assigned_projects/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), assigned_project_controller.delete_assigned_project)

// daily_task routes
const daily_task_controller = require("../controller/owner/daily_task")

router.get("/daily_tasks", verifyAccessTokenforUsersAdmin, daily_task_controller.all_daily_task)
router.get("/daily_tasks/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), daily_task_controller.one_daily_task)
router.put("/daily_tasks/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.daily_task_schema), daily_task_controller.update_daily_task)
router.delete("/daily_tasks/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), daily_task_controller.delete_daily_task)

module.exports = router;
