const express = require('express');
const { getReport, createReport, updateReport } = require('../model/report.modle');
const router = express.Router();

router.get('/', getReport);
router.post('/create', createReport);
router.put('/update', updateReport);

module.exports = router;