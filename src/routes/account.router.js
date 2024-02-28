const { Router } = require("express")
const router = Router()
const accountController = require("../controllers/account.controller")
const auth = require("../middleware/auth")

router.post("/login", accountController.login)
router.post("/create-account", accountController.createAccount)
router.get("/get-all-users", auth, accountController.getAllUsers)
router.post("/change-user-password", auth, accountController.changeUserPassword)

module.exports = router