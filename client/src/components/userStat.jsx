import React from 'react';
import User from './user';

const UserStat = props => {
  console.log(props)
  const { stat } = props
  const { author } = stat
  console.log(author);
  return (
    <React.Fragment>
      <User author={ author }/>
    </React.Fragment>
  )   
}

export default UserStat;
