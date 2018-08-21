import React from 'react';
import User from './user';

const UserStat = props => {
  const { stat } = props
  const { author } = stat
  const mostRecentWeek = stat.weeks[stat.weeks.length - 1]
  return (
    <div>
      <User author={ author }/>
      <p style={{display: 'inline'}}>Total commits: {stat.total}</p>
      <div>
        <table className="table">
          <tbody>
            <tr><td>Info for week of {new Date(mostRecentWeek.w * 1000).toLocaleString()}</td></tr>
            <tr><td>Commits: {mostRecentWeek.c} Additions: {mostRecentWeek.a} Deletions: {mostRecentWeek.d}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )   
}

export default UserStat;
