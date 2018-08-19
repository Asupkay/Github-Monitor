const repositoriesRouter = require('./repositories');
const express = require('express');

const router = express.Router();

router.use('/repositories', repositoriesRouter);

module.exports = router;
