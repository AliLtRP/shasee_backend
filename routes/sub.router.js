const express = require('express');
const { createSub, getSub, updateSub, deleteSub } = require('../model/sub.model');
const router = express.Router();

router.get('/', getSub);
router.post('/create', createSub);
router.put('/update', updateSub);
router.delete('/delete', deleteSub);

module.exports = router;