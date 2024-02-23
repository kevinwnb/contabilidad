const { Router } = require("express")
const router = Router()
const accountController = require("../controllers/account.controller")

router.post("/login", accountController.login)
router.post("/create-account", accountController.createAccount)

module.exports = router