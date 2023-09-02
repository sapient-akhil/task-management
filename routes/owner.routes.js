const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const {verifyAccessTokenforOwner } = require("../helper/token")

//admin routes
const employeeController = require("../controller/owner/owner")

router.post("/create-update-employee",verifyAccessTokenforOwner,Validators.forReqBody(Schema.employeeSchema), employeeController.createUpdateEmployeeByOwner)
router.get("/all-employee",verifyAccessTokenforOwner, employeeController.allEmployee)
router.get("/one-employee/:id", Validators.forParams(Schema.params), employeeController.oneEmployee)
router.delete("/delete-employee/:id", Validators.forParams(Schema.params), employeeController.deleteEmployeeByOwner)

//roledata routes
const roleController = require("../controller/owner/role")

router.post("/create-update-role", Validators.forReqBody(Schema.role), roleController.createUpdateRole)
router.get("/all-role-data", roleController.allRole)
router.get("/one-role-data/:id", Validators.forParams(Schema.params), roleController.oneRole)
router.delete("/delete-role-data/:id", Validators.forParams(Schema.params), roleController.deleteRoleData)

//designationData routes

const designationController = require("../controller/owner/designation")

router.post("/create-update-designation", Validators.forReqBody(Schema.designation), designationController.createUpdateDesignation)
router.get("/all-designation-data", designationController.allDesignation)
router.get("/one-designation-data/:id", Validators.forParams(Schema.params), designationController.oneDesignation)
router.delete("/delete-designation-data/:id", Validators.forParams(Schema.params), designationController.deletedesignationDesignation)

// technology_skills routes
const technology_skills_controller = require("../controller/owner/technology_skills")

router.post("/create-update-technology_skills",verifyAccessTokenforOwner, Validators.forReqBody(Schema.technology_skills), technology_skills_controller.create_update_technology_skills)
router.get("/all-technology_skills", technology_skills_controller.all_technology_skills)
router.get("/one-technology_skill/:id", Validators.forParams(Schema.params), technology_skills_controller.one_technology_skills)
router.delete("/delete-technology_skill/:id", Validators.forParams(Schema.params), technology_skills_controller.delete_technology_skills)
 
module.exports = router;
