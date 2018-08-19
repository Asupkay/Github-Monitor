import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    response: ''
  };
  
  componentDidMount() {
    this.callApi();
  }
  
  callApi = async () => {
    const response = await axios.get('/github');
    console.log(response);
    const message = response.data.message;
    this.setState({response: message});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          { this.state.response }
        </p>
      </div>
    );
  }
}

export default App;
