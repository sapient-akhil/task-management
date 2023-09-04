const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforUsers } = require("../helper/token")

//admin routes
const usersController = require("../controller/users/users")

router.get("/users", verifyAccessTokenforUsers, usersController.allUsers)
router.get("/users/:id", verifyAccessTokenforUsers, Validators.forParams(Schema.params), usersController.oneUsers)

//roledata routes
const roleController = require("../controller/users/role")

router.get("/roles", verifyAccessTokenforUsers, roleController.allRole)
router.get("/roles/:id", verifyAccessTokenforUsers, Validators.forParams(Schema.params), roleController.oneRole)

//designationData routes
const designationController = require("../controller/users/designation")

router.get("/designations", verifyAccessTokenforUsers, designationController.allDesignation)
router.get("/designations/:id", verifyAccessTokenforUsers, Validators.forParams(Schema.params), designationController.oneDesignation)

// technology_skills routes
const technology_skills_controller = require("../controller/users/technology_skills")

router.get("/technology_skills", verifyAccessTokenforUsers, technology_skills_controller.all_technology_skills)
router.get("/technology_skills/:id", verifyAccessTokenforUsers, Validators.forParams(Schema.params), technology_skills_controller.one_technology_skills)

module.exports = router;

