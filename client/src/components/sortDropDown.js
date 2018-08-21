import React from 'react';

const SortDropDown = props => {
  return (
    <React.Fragment>
      <p style={{display: 'inline'}}>Sort by: </p>
      <select className="custom-select my-1 mr-sm-2" onChange={props.onChange} id="inlineFormCustomSelectPref" value={props.selected} style={{ width: '50%', display: 'inline'}} >
        <option value="alphabetical">Alphabetical</option>
        <option value="lastCommit">Last Commit</option>
        <option value="mostCommits">Most Commits</option>
      </select>
    </React.Fragment>
  )   
}

export default SortDropDown;
