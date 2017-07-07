var React = require('react');
var ReactDOM = require('react-dom');

export default class ScoreForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      score1: 0,
      score2: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.id == 'score1') {
      this.setState({score1: event.target.value})
    } else {
      this.setState({score2: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onScoreFormSubmit(this.state, this.props.fixture.fixture_id);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Team 1 Score: </label><input type="number" id="score1" value={this.state.score1} onChange={this.handleChange} /><br />
        <label>Team 2 Score: </label><input type="number" id="score2" value={this.state.score2} onChange={this.handleChange} /><br />
        <input type="submit" value="Add Score" /><br />
      </form>
    )
  }
  
}