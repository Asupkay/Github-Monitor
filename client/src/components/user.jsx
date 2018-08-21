import React from 'react';

const imgSize = {
  width: '10%'
}

const inlineStyling = {
  display: 'inline'
}

const User = (props) => {
  const { author } = props;
  let authorInfo;
  if(author.user) {
    let name;
    if(author.user.name) {
      name = author.user.name;
    } else {
      name = author.name
    }
    authorInfo = <React.Fragment>
      <p className="card-text" style={ inlineStyling }>{ name } </p>
      <a href={ author.user.url}>
        <img style={ imgSize }src={ author.user.avatarUrl } alt={name + " avatar"}/>
      </a>
    </React.Fragment>;
  } else if(author.name) {
    authorInfo = <React.Fragment>
      <p className="card-text" style={ inlineStyling }>{ author.name } </p> 
      <img style={ imgSize }src={ author.avatarUrl } alt={author.name + " avatar"}/>
    </React.Fragment>;
  } else {
    authorInfo = <React.Fragment>
      <p className="card-text" style={ inlineStyling }>{ author.login } </p> 
      <a href={ author.html_url }>
        <img style={ imgSize }src={ author.avatar_url } alt={author.login + " avatar"}/>
      </a>
    </React.Fragment>;
  }

  return (
    <div style={inlineStyling}>
      { authorInfo }
    </div>
  );
};

export default User;
