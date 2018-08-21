import React, { Component } from 'react';
import axios from 'axios';
import UserStat from './userStat';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import User from './user';

const header2Size = {
  fontSize: '1.5em'
}

const header3Size = {
  fontSize: '1.1em'
}

const inlineStyling = {
  display: 'inline'
}

const underline = {
  textDecoration: 'underline'
}

class Repo extends Component {
  state = {
    modal: false,
    statistics: ""
  }

  openModal = () => {
    this.toggle();
    this.getStatisticsInfo();
  } 

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  getStatisticsInfo = async () => {
    let { repo } = this.props;
    let url = `/api/github/statistics?owner=${repo.owner.login}&repo=${repo.name}&authToken=${this.props.authToken}`;
    const response = await axios.get(url);
    const stats = response.data.stats;
    this.setState({statistics: stats});
  }

  render() {
    const { repo } = this.props;
    const commit = repo.defaultBranchRef.target.history.nodes[0];
    const totalCount = repo.defaultBranchRef.target.history.totalCount;
    const { author, additions, deletions, message } = commit;

    let coloring = {
      backgroundColor: 'inherit'
    }

    if(this.props.mostRecentPush === repo.id) {
      coloring.backgroundColor = 'yellow'
    }

    return (
      <div className="card col-12 col-md-6 col-lg-4" style={ coloring }>
        <div className="card-body">
          <a href={repo.url}><h2 className="card-title" style = { header2Size }>{ repo.name }</h2></a>
          <h3 className="card-subtitle mb-2 text-muted" style = { header3Size }>Last Push: { (new Date(repo.pushedAt)).toLocaleString() }</h3>
          <div style={{textAlign: "left"}}>
            <p className="card-text"><span style={ underline }>Total Commits:</span> { totalCount }</p>
            <p className="card-text" style={ inlineStyling }><span style={ underline }>Last Commiter:</span> </p>
            <User author={ author }/>
            <p className="card-text"><span style={ underline }>Message:</span> { message }</p>
            <div>
              <p className="card-text" style={ inlineStyling }><span style={ underline }>Additions:</span> <span style={{color: 'green'}}> +{ additions }</span></p>
              <p className="card-text" style={{display: 'inline', float: 'right' }}> <span style={ underline }>Deletions:</span> <span style={{color: 'red'}}>-{deletions}</span> </p>
            </div>
            <div style={{height: '30px'}}>
              <Button color="dark" style={{ position:'absolute', bottom: 10, right: 10 }} onClick={this.openModal}>More Detail</Button>
            </div>
        
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{repo.name} Info</ModalHeader>
              <ModalBody>
                <ol>
                  { this.renderStats() }
                </ol>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>

          </div>
        </div>
      </div> 
    );
  }

  renderStats = () => {
    const { statistics } = this.state;
    if(statistics === "") return <p>Loading...</p>
    if(statistics.error) return <p>{ statistics.error }</p>
    if(statistics.length === 0) return <p>No Contributors</p>
    return <React.Fragment>{statistics.map(stat => <li key={stat.author.login}><UserStat stat={ stat }/></li>)}</React.Fragment>;
  }
};

export default Repo;
