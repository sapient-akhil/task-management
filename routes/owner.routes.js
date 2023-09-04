const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforOwner } = require("../helper/token")

//admin routes
const usersController = require("../controller/owner/owner")

router.post("/users", verifyAccessTokenforOwner, Validators.forReqBody(Schema.usersSchema), usersController.createUsersByOwner)
router.get("/users", usersController.allUsers)
router.get("/users/:id", Validators.forParams(Schema.params), usersController.oneUsers)
router.delete("/users/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), usersController.deleteUsersByOwner)
router.put("/users/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.usersSchema), usersController.updateUsersByOwner)

//roledata routes
const roleController = require("../controller/owner/role")

router.post("/roles", verifyAccessTokenforOwner, Validators.forReqBody(Schema.roleSchema), roleController.createRole)
router.get("/roles", roleController.allRole)
router.get("/roles/:id", Validators.forParams(Schema.params), roleController.oneRole)
router.delete("/roles/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), roleController.deleteRoleData)
router.put("/roles/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.roleSchema), Validators.forReqBody(Schema.role), roleController.updateRole)

//designationData routes
const designationController = require("../controller/owner/designation")

router.post("/designations", verifyAccessTokenforOwner, Validators.forReqBody(Schema.designationSchema), designationController.createDesignation)
router.get("/designations", designationController.allDesignation)
router.get("/designations/:id", Validators.forParams(Schema.params), designationController.oneDesignation)
router.delete("/designations/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), designationController.deleteDesignation)
router.put("/designations/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.designationSchema), Validators.forReqBody(Schema.designation), designationController.updateDesignation)

// technology_skills routes
const technology_skills_controller = require("../controller/owner/technology_skills")

router.post("/technology_skills", verifyAccessTokenforOwner, Validators.forReqBody(Schema.technology_skills_Schema), technology_skills_controller.create_technology_skills)
router.get("/technology_skills", technology_skills_controller.all_technology_skills)
router.get("/technology_skills/:id", Validators.forParams(Schema.params), technology_skills_controller.one_technology_skills)
router.delete("/technology_skills/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), technology_skills_controller.delete_technology_skills)
router.put("/technology_skills/:id", verifyAccessTokenforOwner, Validators.forParams(Schema.params), Validators.forReqBody(Schema.technology_skills_Schema), technology_skills_controller.update_technology_skills)


module.exports = router;
