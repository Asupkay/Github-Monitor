const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.query.authToken);
  console.log(req.body);
  let authToken = req.query.authToken;
  let promises = [];
  let repos = req.body;
  repos.map((repo) => { 
    let owner = repo.owner.login;
    let repoName = repo.name;
    const url = `https://api.github.com/repos/${owner}/${repoName}/hooks`
    console.log(url);
    let promise = axios.post(url, {name: 'web', config: {url: 'https://clamflelmo.com', content_type: 'json' }},{ headers: {'Authorization': `bearer ${authToken}`}});
    promises.push(promise);
  });

  Promise.all(promises).then((values) => {
    console.log(values);
    return res.json({message: 'done'});
  }).catch((e) => {
    return res.json({message: 'done'});
  });
});

module.exports = router;

