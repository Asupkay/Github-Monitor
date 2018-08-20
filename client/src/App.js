import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Repos from './components/repos';

class App extends Component {
  state = {
    repositories: ""
  };
  
  constructor(props) {
    super(props)
    this.callApi();
  }
  
  callApi = async () => {
    const response = await axios.get('/api/github/repositories');
    const repos = response.data.repositories;
    this.setState({repositories: repos});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <article className="container">
          <Repos repos={this.state.repositories}/>
        </article>
      </div>
    );
  }
}

export default App;
