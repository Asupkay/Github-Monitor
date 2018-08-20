import React from 'react';

const imgSize = {
  width: '10%'
}

const inlineStyling = {
  display: 'inline'
}

const User = (props) => {
  const { author } = props;
  console.log(author)
  console.log(author.user)
  let authorInfo;
  if(author.user) {
    authorInfo = <React.Fragment>
      <p className="card-text" style={ inlineStyling }>{ author.user.name } </p>
      <a href={ author.user.url}>
        <img style={ imgSize }src={ author.user.avatarUrl } alt={author.user.name + " avatar"}/>
      </a>
    </React.Fragment>;
  } else {
    authorInfo = <React.Fragment><p className="card-text" style={ inlineStyling }>{ author.name } </p> <img style={ imgSize }src={ author.avatarUrl } alt={author.name + " avatar"}/></React.Fragment>;
  }

  return (
    <div style={inlineStyling}>
      { authorInfo }
    </div>
  );
};

export default User;
