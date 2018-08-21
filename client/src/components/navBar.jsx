import React from 'react';
import logo from '../GitHub-Logo.png';

const imgStyle = {
  width: '30px',
  height: '30px',
  marginRight: '10px'
}

const NavBar = (props) => {
  let title;
  if(props.user) {
    title = `Github Monitor for ${props.user}'s Repositories`
  } else {
    title = "Github Monitor";
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={ logo } className="d-inline-block align-top" style={ imgStyle } alt=""/>
        <p style={{display: 'inline'}}>{ title }</p>
      </a>
    </nav>
  )
}

export default NavBar;
