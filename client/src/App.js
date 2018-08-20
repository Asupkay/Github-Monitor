import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Repos from './components/repos';
import NavBar from './components/navBar';


const containerMargin = {
  margin: '10px auto 10px auto'
}

class App extends Component {
  state = {
    repositories: "",
    mostRecentlyUpdated: "",
    user: "asupkay"
  };
  
  componentDidMount(props) {
    let socket = io.connect();
    let user = this.state.user
    socket.on('connect', function() {
      socket.emit('room', user);
    });

    socket.on('update', msg => {
      this.setState({mostRecentlyUpdated: msg.repository.id});
      this.callApi();
    });
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
          <Repos mostRecentPush={this.state.mostRecentlyUpdated} repos={this.state.repositories}/>
        </article>
      </div>
    );
  }
}

export default App;
