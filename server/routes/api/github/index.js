const repositoriesRouter = require('./repositories');
const statisticsRouter = require('./statistics');
const express = require('express');

const router = express.Router();

router.use('/repositories', repositoriesRouter);
router.use('/statistics', statisticsRouter);

module.exports = router;
