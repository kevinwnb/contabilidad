const { Router } = require("express")
const tripController = require("../controllers/trip.controller")

const router = Router()

router.get("/all", tripController.getAll)
router.post("/create", tripController.create)
router.put("/update", tripController.update)
router.delete("/delete/:id", tripController.delete)

module.exports = router