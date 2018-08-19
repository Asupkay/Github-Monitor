const constructorMethod = (app) => {
  app.use('/github', (req, res) => {
    res.json({message: 'Github'});
  });
  app.use('/', (req, res) => {
    res.json({message: 'Not yet implemented'});
  });
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not a valid route'
    });
  });
}

/*
{
  viewer {
    repositories(first: 50) {
      nodes{
        id
        name
        pushedAt
        url
        collaborators(first: 10) {
          nodes{
            name
            avatarUrl
          }
          totalCount
        }
        defaultBranchRef{
          target{
            ... on Commit{
              history(first: 1) {
                nodes{
                  additions
                  deletions
                  author{
                    name
                    avatarUrl
                  }
                  pushedDate
                  message
                }
                totalCount
              }
              
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
*/   

module.exports = constructorMethod;
