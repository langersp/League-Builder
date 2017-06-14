var React = require('react');
var ReactDOM = require('react-dom');

export default class Player extends React.Component {
  render() {
    console.log(this.props.player)
    return (
      <div>{this.props.player.name} <button value={this.props.player.player_id} onClick={this.props.clickHandler}>Remove</button></div>
    )
  }
}