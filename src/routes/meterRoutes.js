const express = require('express');
const {
  listMeters,
  getMeter,
  getMeterConsumption
} = require('../controllers/meterController');

const router = express.Router();

router.get('/', listMeters);
router.get('/:id/consumption', getMeterConsumption);
router.get('/:id', getMeter);

module.exports = router;
