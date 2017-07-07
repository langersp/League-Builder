var React = require('react');
var ReactDOM = require('react-dom');

export default class PlayerRow extends React.Component {
  render() {	
    return (
      <tr>
        <td>{this.props.player.nickname} ({this.props.player.name})</td>
        <td>{this.props.played}</td>
        <td>{this.props.points}</td>
        <td>{this.props.lastFive}</td>
      </tr>
    );
  }
}