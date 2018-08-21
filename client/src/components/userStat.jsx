import React from 'react';
import User from './user';

const UserStat = props => {
  const { stat } = props
  const { author } = stat
  return (
    <div>
      <User author={ author }/>
    </div>
  )   
}

export default UserStat;
