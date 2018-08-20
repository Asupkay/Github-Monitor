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

const underline = {
  textDecoration: 'underline'
}

const Repo = (props) => {
  const { repo } = props;
  const commit = repo.defaultBranchRef.target.history.nodes[0];
  const { author } = commit;

  return (
    <div className="card col-12 col-md-6 col-lg-4">
      <div className="card-body">
        <h2 className="card-title" style = { header2Size }>{ repo.name }</h2>
        <h3 className="card-subtitle mb-2 text-muted" style = { header3Size }>Last Push: { (new Date(repo.pushedAt)).toLocaleString() }</h3>
        <div style={{textAlign: "left"}}>
          <p className="card-text" style={ inlineStyling }><span style={ underline }>Last Commiter:</span> </p>
          <User author={ author }/>
          <p className="card-text"><span style={ underline }>Message:</span> { commit.message }</p>
        </div>
      </div>
    </div> 
  );
};

export default Repo;
