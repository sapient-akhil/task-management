const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
// const { verifyAccessTokenforAdmin, verifyAccessTokenforTrainer, verifyAccessTokenforSuperAdmin } = require("../helper/token")

//admin routes
const employeeController = require("../controller/employee/employee")

// router.get("/check-super-admin", employeeController.checkSuperAdmin)
// router.post("/create-super-admin", Validators.forReqBody(Schema.trainerSchema), employeeController.createSuperAdmin)
router.post("/employee-login", Validators.forReqBody(Schema.employeeLogin), employeeController.employeeLogin)
// router.post("/create-update-employee",Validators.forReqBody(Schema.employeeSchema), employeeController.createUpdateEmployeeByOwner)
// router.get("/all-admin", employeeController.allAdmin)
// router.get("/one-admin/:id", verifyAccessTokenforSuperAdmin, Validators.forParams(Schema.params), employeeController.oneAdmin)
// router.delete("/delete-admin/:id", verifyAccessTokenforSuperAdmin, Validators.forParams(Schema.params), employeeController.deleteAdmin)

module.exports = router;