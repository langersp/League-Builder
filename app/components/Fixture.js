var React = require('react');
var ReactDOM = require('react-dom');

import ScoreForm from './ScoreForm';

export default class Fixture extends React.Component {
  render() {
    var team1 = [];
    var team2 = [];
    this.props.fixture.teams.team1.forEach((player) => { team1.push(player + ", "); });
    this.props.fixture.teams.team2.forEach((player) => { team2.push(player + ", "); });
    return (

      <li><div className="fixture">
        <span className="date">{this.props.fixture.date}: </span><br />
        <span>{team1}<br />Versus<br />{team2} </span><br />
        {this.props.fixture.played ? (
          <strong><span>Final Score: {this.props.fixture.score1}</span> - <span className="date">{this.props.fixture.score2}</span></strong>
        ) : (
          <div>
            <h3>Add Score</h3>
            <ScoreForm fixture={this.props.fixture} onScoreFormSubmit={this.props.onScoreFormSubmit} />
          </div>
        )}

      </div></li>
    )
  }
}