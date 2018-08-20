import React from 'react';

const header2Size = {
  fontSize: '2.0em'
}

const header3Size = {
  fontSize: '1.2em'
}

const imgSize = {
  width: '10%'
}

const inlineStyling = {
  display: 'inline'
}

const Repo = (props) => {
  const { repo } = props;
  const { author } = repo.defaultBranchRef.target.history.nodes[0];
  console.log(author)
  console.log(author.user)
  let authorInfo;
  if(author.user) {
    authorInfo = <React.Fragment><p className="card-text" style={ inlineStyling }>Last Commiter: { author.user.name } </p><a href={ author.user.url}><img style={ imgSize }src={ author.user.avatarUrl } alt={author.user.name + " avatar"}/></a></React.Fragment>;
  } else {
    authorInfo = <React.Fragment><p className="card-text" style={ inlineStyling }>Last Commiter: { author.name } </p> <img style={ imgSize }src={ author.avatarUrl } alt={author.name + " avatar"}/></React.Fragment>;
  }

  return (
    <div className="card col-12 col-md-6 col-lg-4">
      <div className="card-body">
        <h2 className="card-title" style = { header2Size }>{ repo.name }</h2>
        <h3 className="card-subtitle mb-2 text-muted" style = { header3Size }>Last Push: { repo.pushedAt }</h3>
        <div>
          { authorInfo }
        </div>
      </div>
    </div> 
  );
};

export default Repo;
