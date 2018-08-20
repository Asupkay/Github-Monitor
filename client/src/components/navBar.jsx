import React from 'react';
import logo from '../GitHub-Logo.png';

const imgStyle = {
  width: '30px',
  height: '30px',
  marginRight: '10px'
}

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={ logo } className="d-inline-block align-top" style={ imgStyle } alt=""/>
        <p style={{display: 'inline'}}>Github Monitor</p>
      </a>
    </nav>
  )
}

export default NavBar;
