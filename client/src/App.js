import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Repos from './components/repos';
import NavBar from './components/navBar';

const containerMargin = {
  margin: '10px auto 10px auto'
}

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
        <NavBar/>
        <article className="container" style={ containerMargin }>
          <Repos repos={this.state.repositories}/>
        </article>
      </div>
    );
  }
}

export default App;
