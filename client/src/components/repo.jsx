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
  const { author, additions, deletions, message } = commit;

  let coloring = {
    backgroundColor: 'inherit'
  }

  if(props.mostRecentPush === repo.id) {
    coloring.backgroundColor = 'yellow'
  }

  return (
    <div className="card col-12 col-md-6 col-lg-4" style={ coloring }>
      <div className="card-body">
        <a href={repo.url}><h2 className="card-title" style = { header2Size }>{ repo.name }</h2></a>
        <h3 className="card-subtitle mb-2 text-muted" style = { header3Size }>Last Push: { (new Date(repo.pushedAt)).toLocaleString() }</h3>
        <div style={{textAlign: "left"}}>
          <p className="card-text" style={ inlineStyling }><span style={ underline }>Last Commiter:</span> </p>
          <User author={ author }/>
          <p className="card-text"><span style={ underline }>Message:</span> { message }</p>
          <div>
            <p className="card-text" style={ inlineStyling }><span style={ underline }>Additions:</span> <span style={{color: 'green'}}> +{ additions }</span></p>
            <p className="card-text" style={{display: 'inline', float: 'right' }}> <span style={ underline }>Deletions:</span> <span style={{color: 'red'}}>-{deletions}</span> </p>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Repo;
