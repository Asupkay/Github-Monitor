const githubRouter = require('./github');
const express = require('express');

const router = express.Router();

router.use('/github', githubRouter);

module.exports = router;
