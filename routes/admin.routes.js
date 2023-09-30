const express = require("express");
const router = express.Router();
const Schema = require("../helper/schema")
const model = require("../services")
const Validators = require("../helper/validation")
const { verifyAccessTokenforAdmin, verifyAccessTokenforUsersAdmin } = require("../helper/verify.token")

//admin routes
const usersController = require("../controller/admin/admin")

router.post("/users", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.usersSchema), usersController.createUsersByAdmin)
router.get("/users", verifyAccessTokenforUsersAdmin, usersController.allUsers)
router.get("/users/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), usersController.oneUsers)
router.delete("/users/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), usersController.deleteUsersByAdmin)
router.put("/users/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.updateUsersSchema), usersController.updateUsersByAdmin)

//roledata routes
const roleController = require("../controller/admin/role")

router.post("/roles", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.roleSchema), roleController.createRole)
router.get("/roles", verifyAccessTokenforUsersAdmin, roleController.allRole)
router.get("/roles/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), roleController.oneRole)
router.put("/roles/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.roleSchema), Validators.forReqBody(Schema.role), roleController.updateRole)
router.delete("/roles/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), roleController.deleteRoleData)

//designationData routes
const designationController = require("../controller/admin/designation")

router.post("/designations", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.designationSchema), designationController.createDesignation)
router.get("/designations", verifyAccessTokenforUsersAdmin, designationController.allDesignation)
router.get("/designations/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), designationController.oneDesignation)
router.put("/designations/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.designationSchema), Validators.forReqBody(Schema.designation), designationController.updateDesignation)
router.delete("/designations/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), designationController.deleteDesignation)

// technology_skills routes
const technologySkillsController = require("../controller/admin/technologySkills")

router.post("/technology-skills", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.technologySkillsSchema), technologySkillsController.createTechnologySkills)
router.get("/technology-skills", verifyAccessTokenforUsersAdmin, technologySkillsController.allTechnologySkills)
router.get("/technology-skills/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), technologySkillsController.oneTechnologySkills)
router.put("/technology-skills/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.technologySkillsSchema), technologySkillsController.updateTechnologySkills)
router.delete("/technology-skills/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), technologySkillsController.deleteTechnologySkills)

// project_category routes
const projectCategoryController = require("../controller/admin/projectCategory")

router.post("/project-category", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.projectCategorySchema), projectCategoryController.createProjectCategory)
router.get("/project-category", verifyAccessTokenforUsersAdmin, projectCategoryController.allProjectCategory)
router.get("/project-category/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectCategoryController.oneProjectCategory)
router.put("/project-category/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.projectCategorySchema), projectCategoryController.updateProjectCategory)
router.delete("/project-category/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), projectCategoryController.deleteProjectCategory)

// projects routes
const projectsController = require("../controller/admin/projects")

router.post("/projects", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.projectsSchema), projectsController.createProjects)
router.get("/projects", verifyAccessTokenforUsersAdmin, projectsController.allProjects)
router.get("/projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), projectsController.oneProjects)
router.put("/projects/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.projectsSchema), projectsController.updateProjects)
router.delete("/projects/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), projectsController.deleteProjects)

// assigned_project routes
const assignedProjectController = require("../controller/admin/assignedProject")

router.post("/assigned-projects", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.assignedProjectSchema), assignedProjectController.createAssignedProject)
router.post("/get-assigned-projects", verifyAccessTokenforUsersAdmin, assignedProjectController.allAssignedProject)
router.get("/assigned-projects", assignedProjectController.allProjectTotalTimeForAdmin)
router.get("/assigned-projects/category", assignedProjectController.allProjectCategoryTotalTimeForAdmin)
router.get("/assigned-projects/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), assignedProjectController.oneAssignedProject)
router.put("/assigned-projects/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.assignedProjectSchema), assignedProjectController.updateAssignedProject)
router.delete("/assigned-projects/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), assignedProjectController.deleteAssignedProject)

// daily_task routes
const dailyTaskController = require("../controller/admin/dailyTask")

router.post("/daily-tasks", verifyAccessTokenforUsersAdmin, dailyTaskController.allDailyTask)
router.get("/daily-tasks/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), dailyTaskController.oneDailyTask)
router.put("/daily-tasks/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.dailyTaskSchema), dailyTaskController.updateDailyTask)
router.delete("/daily-tasks/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), dailyTaskController.deleteDailyTask)

// leaveStatus routes
const leaveStatusController = require("../controller/admin/leaveStatus")

router.post("/leave-status", verifyAccessTokenforUsersAdmin, Validators.forReqBody(Schema.leaveStatusSchema), leaveStatusController.createLeaveStatus)
router.get("/leave-status", verifyAccessTokenforUsersAdmin, leaveStatusController.allLeaveStatus)
router.get("/leave-status/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveStatusController.oneLeaveStatus)
router.put("/leave-status/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.leaveStatusSchema), leaveStatusController.updateLeaveStatus)
router.delete("/leave-status/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), leaveStatusController.deleteLeaveStatus)

// leaveType routes
const leaveTypeController = require("../controller/admin/leaveType")

router.post("/leave-type", verifyAccessTokenforUsersAdmin, Validators.forReqBody(Schema.leaveTypeSchema), leaveTypeController.createLeaveType)
router.get("/leave-type", verifyAccessTokenforUsersAdmin, leaveTypeController.allLeaveType)
router.get("/leave-type/:id", verifyAccessTokenforUsersAdmin, Validators.forParams(Schema.params), leaveTypeController.oneLeaveType)
router.put("/leave-type/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.leaveTypeSchema), leaveTypeController.updateLeaveType)
router.delete("/leave-type/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), leaveTypeController.deleteLeaveType)

// leave routes
const leaveController = require("../controller/admin/leave")

router.post("/leave", verifyAccessTokenforAdmin, leaveController.allLeave)
router.get("/leave/today", leaveController.findAllTodayOnLeaveUser)
router.get("/leave/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), leaveController.oneLeave)
router.patch("/leave/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), leaveController.updateLeave)
router.delete("/leave/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), leaveController.deleteLeave)

// quickLink routes
const quickLinkController = require("../controller/admin/quickLinks")

router.post("/quick-link", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.quickLinksSchema), quickLinkController.createQuickLinks)
router.get("/quick-link", verifyAccessTokenforAdmin, quickLinkController.allQuickLinks)
router.get("/quick-link/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forParams(Schema.params), quickLinkController.oneQuickLinks)
router.put("/quick-link/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.quickLinksSchema), Validators.forParams(Schema.params), quickLinkController.updateQuickLinks)
router.delete("/quick-link/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forParams(Schema.params), quickLinkController.deleteQuickLinks)

// router.post("/data-insert", async (req, res, next) => {
//     try {
//         const req_data = JSON.parse(req.body.data);
//         await model.leaveServices.addManycreateLeave(req_data)


//         res.status(201).send({
//             success: true,
//             message: " Quick link is created successfully.",
//             data: req_data
//         })
//     } catch (error) {
//         next(error)
//     }
// })



module.exports = router;
