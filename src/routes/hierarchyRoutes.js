const express = require('express');
const { getHierarchy } = require('../controllers/hierarchyController');

const router = express.Router();

router.get('/', getHierarchy);

module.exports = router;
