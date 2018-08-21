const repositoriesRouter = require('./repositories');
const statisticsRouter = require('./statistics');
const webhooksRouter = require('./webHooks');
const express = require('express');

const router = express.Router();

router.use('/repositories', repositoriesRouter);
router.use('/statistics', statisticsRouter);
router.use('/webhooks', webhooksRouter);

module.exports = router;
