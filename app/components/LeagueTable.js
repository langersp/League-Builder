var React = require('react');
var ReactDOM = require('react-dom');
const _ = require('lodash');

import PlayerRow from './PlayerRow'

export default class LeagueTable extends React.Component {
  render() {
    let rows = [];
    //use lodash to sort the array by points
    const sortedPlayers = _.sortBy(this.props.players, ['points'], function(n) {
      return Math.sin(n);
    });

    sortedPlayers.reverse();

    sortedPlayers.forEach(function(player) { 
      const playerPlayed = player.results.length;
      const lastFive = player.results.slice(Math.max(playerPlayed - 5, 0));
      rows.push(<PlayerRow player={player} key={player.player_id} played={playerPlayed} points={player.points} lastFive={lastFive} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Played</th>
            <th>Points</th>
            <th>Last Five</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
