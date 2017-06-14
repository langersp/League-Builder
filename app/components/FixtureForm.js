var React = require('react');
var ReactDOM = require('react-dom');

import PlayerOption from './PlayerOption';
import Player from './Player';

export default class FixtureForm extends React.Component {

  constructor(props) {
    super(props);
    this.playerOptions = [];
    this.team1Players = [];
    this.team2Players = [];
    //playerData is array of players available for selection. Create copy of props data for immutability
    this.playerData = [...this.props.players];  
    this.divStyle = {
      display:"none"
    };
    this.state = {
      selectedPlayer: '',
      selectedTeam: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
    this.handleFixtureSubmit = this.handleFixtureSubmit.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }


  getPlayerById(playerId) {

    var selectedPlayer = this.props.players.filter(player => {     
       if(player.player_id == playerId) {
          return player;
       }
    });
    return selectedPlayer;
  }

  handleChange(event) {
    this.setState({selectedPlayer: event.target.value});
    this.setState({selectedTeam: event.target.id});
  }

  handleTeamSubmit(event) {
    event.preventDefault();

    //get the seleted player object
    var chosenPlayer = this.getPlayerById(this.state.selectedPlayer);

    if(this.state.selectedTeam == "team1") {
      if(this.team1Players.length < 5) {
        //push a player component into array. Event handler passed to child
        this.team1Players.push(<Player player={chosenPlayer[0]} key={chosenPlayer[0].player_id} clickHandler={this.handleRemove} />);
        this.deletePlayer();
        if(this.team1Players.length == 5) {
          this.playerData.forEach((player,i) => {
            this.team2Players.push(<Player player={player} key={player.player_id} />);
         });
         this.divStyle = {}
        }
      } else {
        //alert("Too many players in Team 1!");
      }
    } else {
      if(this.team2Players.length < 5) {
        this.team2Players.push(<Player player={chosenPlayer[0]} key={chosenPlayer[0].player_id} />); 
        this.deletePlayer();
        if(this.team2Players.length == 5) {
          this.playerData.forEach((player,i) => {
          this.team1Players.push(<Player player={player} key={player.player_id} />);
         });
        } 
      } else {
        //alert("Too many players in Team 2!")
      }
    }

    this.setState({selectedPlayer: ''});
    this.setState({selectedTeam: ''}); 

  }

  handleFixtureSubmit(event) {
    event.preventDefault();
    this.props.onFixtureFormSubmit(this.playerData);
    console.log(this.playerData)
  }

  //available players for selection array - function to delete a player
  deletePlayer() { 
    this.playerData.filter((player, i) => {
      if(player.player_id == this.state.selectedPlayer) {      
          this.playerData.splice(i,1);
          return true;
      }
    });
  }

  //add the player back onto array of available players for selection. Remove from selected players array 'playerData'
  handleRemove(event) {

    var chosenPlayer = this.getPlayerById(event.target.value);

    this.playerData.push(chosenPlayer[0]);

    this.team1Players.forEach(player => {
      if(player.key == event.target.value) {
        this.team1Players.splice(player,1);
      }
    });

    console.log(this.team1Players);
    this.setState({selectedPlayer: ''});
  }

	render() {  

    const playerOptions = this.playerData.map((player) => (
      <PlayerOption player={player} key={player.player_id} />
    ));
    // this.playerData.forEach((player)  => { 
    //   //this.playerData.push(player);
    //   this.playerOptions.push(<PlayerOption player={player} key={player.player_id} />);
    // })

		return (
      <div>
        <h2>Add a Fixture</h2>
  			<div>
  				<span>Team 1:</span>
          <form onSubmit={this.handleTeamSubmit}>		
    				<select onChange={this.handleChange} id="team1">
              <option value="">Please select a player</option>
              {playerOptions}
    				</select>
            <input type="submit" value="Add Player" />
            <input type="hidden" value="1" name="team" />
          </form>
        </div>
        <div> 
          <span>Team 2:</span>    
          <form onSubmit={this.handleTeamSubmit}>   
            <select onChange={this.handleChange} id="team2">
              <option value="">Please select a player</option>
              {playerOptions}
            </select>
            <input type="submit" value="Add Player" />
          </form>
  			</div>
        <div>Team 1 Selection: 
          <ul>{this.team1Players}</ul></div>
        <div>Team 2 Selection: 
          <ul>{this.team2Players}</ul></div>

          <div >
            <form onSubmit={this.handleFixtureSubmit}>
              <input type="submit" value="Add Fixture" />
            </form>
          </div>
      </div>
		);

	}
}