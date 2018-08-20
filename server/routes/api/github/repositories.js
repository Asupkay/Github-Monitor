const express = require('express');
const axios = require('axios');
const router = express.Router();

const repositoryInfoQuery = "query { viewer { repositories(first: 50) { nodes{ id name pushedAt url collaborators(first: 10) { nodes{ name avatarUrl } totalCount } defaultBranchRef{ target{ ... on Commit{ history(first: 1) { nodes{ additions deletions author{ name avatarUrl } pushedDate message } totalCount } } } } } pageInfo { hasNextPage endCursor } } } }"

router.get('/', async (req, res) => {
  let response = await axios.post('https://api.github.com/graphql', {query: repositoryInfoQuery}, { headers: {'Authorization': `bearer ${process.env.GITHUB_API_KEY}`}});
  res.json(response.data);
});

router.post('/', (req, res) => {
  console.log("hello" + JSON.stringify(req.body));
  req.io.emit('asupkay', 'update');
});

module.exports = router;


