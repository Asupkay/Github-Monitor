import React from 'react';

const SortDropDown = props => {
  return (
    <select className="custom-select my-1 mr-sm-2" onChange={props.onChange} id="inlineFormCustomSelectPref" value={props.selected}>
      <option value="alphabetical">Alphabetical</option>
      <option value="lastCommit">Last Commit</option>
      <option value="mostCommits">Most Commits</option>
    </select>
  )   
}

export default SortDropDown;
