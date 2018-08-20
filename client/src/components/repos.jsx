import React from 'react';

const Repos = props => {
  return (
    <div className="row">
      { renderRepositories(props.repos) }
    </div>
  )   
}

const renderRepositories = (repos) => {
  console.log(repos);
  if(repos.length === 0) return <p>No Repositories</p>
  return <React.Fragment>{repos.map(repo => <p key={repo.id}>{repo.name}</p>)}</React.Fragment>;
}

export default Repos;
