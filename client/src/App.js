import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
import Repos from './components/repos';
import NavBar from './components/navBar';
import SortDropDown from './components/sortDropDown';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey: "AIzaSyBGq8RSPjS2tFWKhPQS4n_NSp0f9kCQrFo",
  authDomain: "github-monitor.firebaseapp.com", 
})

const containerMargin = {
  margin: '10px auto 10px auto'
}

class App extends Component {
  state = {
    repositories: "",
    mostRecentlyUpdated: "",
    user: null,
    sort: "alphabetical",
    isSignedIn: false,
    authToken: null
  };
 
  uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
        scopes: [
          'repo',
          'admin: repo_hook'
        ]
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: result => {
        this.setState({
          authToken: result.credential.accessToken,
          user: result.user.displayName                
        }
        ,(() => {
          this.callApi(this.state.authToken)
          let socket = io.connect();
          let user = this.state.user
          socket.on('connect', function() {
            socket.emit('room', user);
          });

          socket.on('update', msg => {
            console.log(msg);
            this.setState({mostRecentlyUpdated: msg.repository.node_id});
            if(this.state.authToken) {
              this.callApi(this.state.authToken);
            }
          });
        }));
      }
    }
  }

  componentDidMount(props) {
    //window.addEventListener('beforeunload', () => firebase.auth().signOut());
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    });
    if(!this.state.authToken) {
      firebase.auth().signOut();  
    }
  }

  callApi = async (authToken) => {
    const response = await axios.get(`/api/github/repositories?authToken=${authToken}`);
    const repos = response.data.repositories;
    this.setState({repositories: repos}, () => {
      this.createWebhooks(this.state.authToken);
      this.sort();
    });
  }

  createWebhooks = async (authToken) => {
    axios.post(`/api/github/webhooks?authToken=${authToken}`, this.state.repositories);
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
        if(a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase())
          return 1;
        return 0;
      }
    } else if (this.state.sort === 'mostCommits') {
      sortFunction = (a, b) => {
        let totalCommitsA;
        let totalCommitsB;
        if(!a.defaultBranchRef) {
          totalCommitsA = 0;
        } else {
          totalCommitsA = a.defaultBranchRef.target.history.totalCount
        }
        if(!b.defaultBranchRef) {
          totalCommitsB = 0;
        } else {
          totalCommitsB = b.defaultBranchRef.target.history.totalCount
        }
        if(totalCommitsA < totalCommitsB)
          return 1;
        if(totalCommitsA > totalCommitsB)
          return -1;
        return 0;
      }
    } else {
      sortFunction = (a, b) => {
        let lastPushA;
        let lastPushB;
        if(!a.defaultBranchRef) {
          lastPushA = 0;  
        } else {
          lastPushA = a.defaultBranchRef.target.history.nodes[0].pushedDate;
        }
        if(!b.defaultBranchRef) {
          lastPushB = 0;
        } else {
          lastPushB = b.defaultBranchRef.target.history.nodes[0].pushedDate;
        }
        return new Date(lastPushB) - new Date(lastPushA);
      }
    }
    this.setState(prevState => ({
      repositories: prevState.repositories.sort(sortFunction)
    }));
  }

  render() {
    let user;
    if(firebase.auth().currentUser) {
      user = firebase.auth().currentUser.displayName;
    } else {
      user = null;
    }

    

    return (
      <div className="App">
        <NavBar user={ user }/>
        {this.state.isSignedIn ?
          <article className="container" style={ containerMargin }>
            <SortDropDown onChange={ this.onSearchChange } selected={this.state.sort}/>
            <button type="button" className="btn btn-dark" onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <Repos mostRecentPush={this.state.mostRecentlyUpdated} authToken = { this.state.authToken } repos={this.state.repositories}/>
          </article>
        :
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        }
      </div>
    );
  }
}

export default App;
