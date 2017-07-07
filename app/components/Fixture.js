var React = require('react');
var ReactDOM = require('react-dom');

import ScoreForm from './ScoreForm';

export default class Fixture extends React.Component {


  //this function is repeated from FixtureForm - could go elsewhere such as a utility function
  getPlayerById(playerId) {

    var selectedPlayer = this.props.players.filter(player => {     
       if(player.player_id == playerId) {
          return player;
       }
    });
    return selectedPlayer;
  }

  render() {
    var team1 = [];
    var team2 = [];

    this.props.fixture.teams.team1.forEach((player) => { 
      const playerName = this.getPlayerById(player);
      team1.push(playerName[0].name + ", "); 
    });
    this.props.fixture.teams.team2.forEach((player) => { 
      const playerName = this.getPlayerById(player);
      team2.push(playerName[0].name + ", "); 
    });
    
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