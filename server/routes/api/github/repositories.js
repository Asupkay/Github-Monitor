const express = require('express');
const axios = require('axios');
const router = express.Router();

const repositoryInfoQuery = "query { viewer { repositories(first: 50) { nodes{ id name pushedAt url owner { login } collaborators(first: 10) { nodes{ name avatarUrl } totalCount } defaultBranchRef{ target{ ... on Commit{ history(first: 1) { nodes{ additions deletions author{ name avatarUrl user{ url avatarUrl name } } pushedDate message } totalCount } } } } } pageInfo { hasNextPage endCursor } } } }"

router.get('/', async (req, res) => {
  let response = await axios.post('https://api.github.com/graphql', {query: repositoryInfoQuery}, { headers: {'Authorization': `bearer ${process.env.GITHUB_API_KEY}`}});
  let repositories = response.data.data.viewer.repositories.nodes
  res.json({repositories: repositories});
});

router.post('/', (req, res) => {
  console.log("hello" + JSON.stringify(req.body));
  req.io.in('asupkay').emit('update', req.body);
  res.json({message: 'success'});
});

module.exports = router;


