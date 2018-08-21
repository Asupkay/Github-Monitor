import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Repos from './components/repos';
import NavBar from './components/navBar';
import SortDropDown from './components/sortDropDown';


const containerMargin = {
  margin: '10px auto 10px auto'
}

class App extends Component {
  state = {
    repositories: "",
    mostRecentlyUpdated: "",
    user: "asupkay",
    sort: "alphabetical"
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
    this.setState({repositories: repos}, () => {
      this.sort();
    });
  }

  onSearchChange = ({target}) => {
    this.setState({
      sort: target.value
    }, () => {
      this.sort();
    });
  }

  sort = () => {
    let sortFunction;
    if(this.state.sort === 'alphabetical') {
      sortFunction = (a, b) => {
        if(a.name < b.name)
          return -1;
        if(a.name > b.name)
          return 1;
        return 0;
      }
    } else if (this.state.sort === 'mostCommits') {
      sortFunction = (a, b) => {
        let totalCommitsA = a.defaultBranchRef.target.history.totalCount
        let totalCommitsB = b.defaultBranchRef.target.history.totalCount
        if(totalCommitsA < totalCommitsB)
          return 1;
        if(totalCommitsA > totalCommitsB)
          return -1;
        return 0;
      }
    } else if (this.state.sort === 'lastCommit') {
      sortFunction = (a, b) => {
        let lastPushA = a.defaultBranchRef.target.history.nodes[0].pushedDate;
        let lastPushB = b.defaultBranchRef.target.history.nodes[0].pushedDate;
        if(lastPushA < lastPushB)
          return 1;
        if(lastPushA > lastPushB)
          return -1;
        return 0;
      }
    }
    this.setState(prevState => ({
      repositories: prevState.repositories.sort(sortFunction)
    }));
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <article className="container" style={ containerMargin }>
          <SortDropDown onChange={ this.onSearchChange } selected={this.state.sort}/>
          <Repos mostRecentPush={this.state.mostRecentlyUpdated} repos={this.state.repositories}/>
        </article>
      </div>
    );
  }
}

export default App;
