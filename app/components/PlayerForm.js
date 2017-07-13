var React = require('react');
var ReactDOM = require('react-dom');

export default class PlayerForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      playerName: '',
      nickName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNickNameChange = this.handleNickNameChange.bind(this);

  }

  handleNameChange(event) {
    this.setState({playerName: event.target.value})
  }

  handleNickNameChange(event) {
    this.setState({nickName: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onPlayerFormSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Player Name: </label><input type="text" id="playerName" value={this.state.playerName} onChange={this.handleNameChange} /><br />
        <label>NickName: </label><input type="text" id="nickName" value={this.state.nickName} onChange={this.handleNickNameChange} /><br />
        <input type="submit" value="Add Player" />
      </form>
    )
  }
  
}