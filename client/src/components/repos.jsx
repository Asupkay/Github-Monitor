import React from 'react';
import Repo from './repo';

const Repos = props => {
  return (
    <div className="row">
      { renderRepositories(props.repos, props.mostRecentPush) }
    </div>
  )   
}

const renderRepositories = (repos, mostRecentPush) => {
  if(repos === "") return <p>Loading...</p>
  if(repos.length === 0) return <p>No Repositories</p>
  return <React.Fragment>{repos.map(repo => <Repo key={repo.id} mostRecentPush={ mostRecentPush } repo={repo}/>)}</React.Fragment>;
}

export default Repos;
