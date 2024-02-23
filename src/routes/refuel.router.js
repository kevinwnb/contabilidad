const {Router} = require('express')
const router = Router()
const refuelController = require('../controllers/refuel.controller')

router.get('/:tripId/:year', refuelController.getAllByIdAndYear)

module.exports = router