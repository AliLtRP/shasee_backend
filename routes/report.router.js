const express = require('express');
const { getReport, createReport, updateReport, getReportByVin } = require('../model/report.modle');
const router = express.Router();


router.get('/', getReport);
router.get('/vin', getReportByVin);
router.post('/create', createReport);
router.put('/update', updateReport);

module.exports = router;