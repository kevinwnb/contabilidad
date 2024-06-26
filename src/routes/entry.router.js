const { Router } = require("express")
const router = Router()
const entryController = require("../controllers/entry.controller")
const auth = require("../middleware/auth")
const authGerente = require("../middleware/auth.gerente")

router.get("/:month/:year/all", [auth, (req, res, next) => {
    if (res.locals.user.role_id == 1 || res.locals.user.role_id == 2) {
        return next()
    }

    return res.send("Unauthorized")
}], entryController.byMonth)
router.get("/employee/:month/:year/all", auth, entryController.byMonthForEmployee)
router.post("/", auth, entryController.create)
router.delete("/:id", authGerente, entryController.delete)

module.exports = router