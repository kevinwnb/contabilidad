const { Router } = require("express")
const router = Router()
const entryController = require("../controllers/entry.controller")

router.get("/:month/:year/all", entryController.byMonth)
router.post("/", entryController.create)

module.exports = router