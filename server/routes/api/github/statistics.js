const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req.query)
  let stats = await queryGitHub(req.query.owner, req.query.repo);
  return res.json({stats: stats});
});

const queryGitHub = async (owner, repo) => {
 let response;
  try {
    let url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
    response = await axios.get(url, { headers: {'Authorization': `bearer ${process.env.GITHUB_API_KEY}`}});
    while(response.status == 202) {
      await sleep(2000);
      response = await axios.get(url, { headers: {'Authorization': `bearer ${process.env.GITHUB_API_KEY}`}}); 
    }
  } catch(e) {
    return { error: e.message};
  }
  let stats = response.data
  return stats;
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;

