const express = require('express');
const { getUserReport } = require('../model/user_report.model');
const router = express.Router();

router.get('/', getUserReport);
router.post('/create', () => {});
router.put('/update', () => {});
router.delete('/delete', () => {});

module.exports = router;