import React from 'react';
import User from './user';

const header2Size = {
  fontSize: '1.5em'
}

const header3Size = {
  fontSize: '1.1em'
}

const inlineStyling = {
  display: 'inline'
}

const Repo = (props) => {
  const { repo } = props;
  const { author } = repo.defaultBranchRef.target.history.nodes[0];

  return (
    <div className="card col-12 col-md-6 col-lg-4">
      <div className="card-body">
        <h2 className="card-title" style = { header2Size }>{ repo.name }</h2>
        <h3 className="card-subtitle mb-2 text-muted" style = { header3Size }>Last Push: { (new Date(repo.pushedAt)).toLocaleString() }</h3>
        <p className="card-text" style={ inlineStyling }>Last Commiter: </p>
        <User author={ author }/>
      </div>
    </div> 
  );
};

export default Repo;
