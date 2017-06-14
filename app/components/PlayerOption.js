var React = require('react');
var ReactDOM = require('react-dom');

export default class PlayerOption extends React.Component {
  render() {
     return (
      <option id={this.props.player.player_id} value={this.props.player.player_id}>{this.props.player.name}</option>
    );
  }
}