var React = require('react');
var ReactDOM = require('react-dom');

import PlayerRow from './PlayerRow'

export default class LeagueTable extends React.Component {
  render() {
    var rows = [];
    this.props.league.forEach(function(player) {     
      rows.push(<PlayerRow player={player} key={player.player_id} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Played</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
