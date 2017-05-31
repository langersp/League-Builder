var React = require('react');
var ReactDOM = require('react-dom');


class Header extends React.Component {
  render() {
    return (
      <header>This is the Header</header>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <header>This is the Footer</header>
    )
  }
}

class PlayerRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.player.nickname} ({this.props.player.name})</td>
        <td>{this.props.player.played}</td>
        <td>{this.props.player.points}</td>
      </tr>
    );
  }
}

class PlayerOption extends React.Component {
  render() {
     return (
      <option id={this.props.player.player_id} value={this.props.player.player_id}>{this.props.player.name}</option>
    );
  }
}

class LeagueTable extends React.Component {
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

class LeagueTableApp extends React.Component {

  constructor(props) {
    super(props);

    //lifting state up - source of truth for other components.
    this.state = {
      data: {}
    };
    this.handleFixtureSubmit = this.handleFixtureSubmit.bind(this);
    this.handleScoreSubmit = this.handleScoreSubmit.bind(this);
  }

  componentWillMount() {
    // $.getJSON("./json/user.json", function(json) {
    //   this.setState({user: json})
    // }
    this.setState({data: LEAGUEDATA})
  }

  handleFixtureSubmit(data) {
    //this.setState({scale: 'c', temperature});
   

    var fix = {
      "fixture_id":3,
      "date": "31/05/2017",
      "played":false,
      "teams": {
        "team1": ['Paul Langley','Anthony Gayton','Mark Stiles','Craig Mant','Craig Mant'],
        "team2": ['Chris Corse','Elna','Chris Farrell','Chris Farrell','Neil']
      },
      "score1":10,
      "score2":0
    }
    console.log("player data")
    console.log(data);

    var newArray = this.state.data;
    newArray.fixtures.push(fix);
    this.setState({data: newArray});
    
  }

  handleScoreSubmit(score, fixtureId) {
    var newArray = this.state.data;
    console.log(newArray)
console.log("jk")
    for(var key in newArray.fixtures) {
      console.log(fixtureId)
      if((parseInt(key)+1) == fixtureId) {
        
        console.log("match")
        //newArray[fixtureId - 1].score1 = 3;
        newArray.fixtures[fixtureId - 1].score1 = score.score1;
        newArray.fixtures[fixtureId - 1].score2 = score.score2;
        newArray.fixtures[fixtureId - 1].played = true;
        this.setState({data: newArray})

      }
    }
    //newArray.fixtures.push(fix);
   // this.setState({data: })
   console.log(this.state)
  }

	render() {
    var fixtures = [];
   
		return (
      
			<div>
        <Header />
				<div className='league-table'>
					<LeagueTable league={this.state.data.players} />
				</div>
				<div className='fixtures'>
          <FixtureList fixtures={this.state.data.fixtures} onScoreFormSubmit={this.handleScoreSubmit}  />
				</div>
        <div className='fixtures-form'>
          <FixtureForm players={this.state.data.players} fixtures={this.state.data.fixtures} onFixtureFormSubmit={this.handleFixtureSubmit}  />
        </div>
        <Footer />
			</div>
		);
	}
}

class ScoreForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      score1: 0,
      score2: 0
    };

    console.log(this.props.fixture.fixture_id)
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
 console.log(this.state);
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

class Fixture extends React.Component {
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

class FixtureList extends React.Component {

  render() {  

    console.log("sibling fixtures prop:");

    var fixtureList = [],
    scheduledList = [];
    this.props.fixtures.forEach((fixture) => {
      if(fixture.played==true) {
        fixtureList.push(<Fixture fixture={fixture} key={fixture.date} />);
      } else {
        scheduledList.push(<Fixture fixture={fixture} key={fixture.date} onScoreFormSubmit={this.props.onScoreFormSubmit} />);
      }
    })
    return (
      <div>
        <h2>Completed Fixtures</h2>
        <ul>{fixtureList}</ul>
        <h2>Outstanding Fixtures</h2>
        <ul>{scheduledList}</ul>
      </div>
    );
  }

}

class Player extends React.Component {
  render() {
    console.log(this.props.player)
    return (
      <div>{this.props.player.name} <button value={this.props.player.player_id} onClick={this.props.clickHandler}>Remove</button></div>
    )
  }
}

class FixtureForm extends React.Component {

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


var LEAGUEDATA = {
  "players": [
    {"player_id": 1, "name": "Paul Langley", "nickname": "Langers", "played": 0, "points": 0},
    {"player_id": 2, "name": "Anthony Gayton", "nickname": "Drax", "played": 0, "points": 0}, 
    {"player_id": 3, "name": "Mark Stiles", "nickname": "Raynaud", "played": 0, "points": 0},
    {"player_id": 4, "name": "Chris Corse", "nickname": "Eggbum", "played": 0, "points": 0},
    {"player_id": 5, "name": "Elna", "nickname": "Elna", "played": 0, "points": 0},
    {"player_id": 6, "name": "Craig Mant", "nickname": "Craigenhead", "played": 0, "points": 0},
    {"player_id": 7, "name": "Karl", "nickname": "Karl", "played": 0, "points": 0},
    {"player_id": 8, "name": "Chris Farrell", "nickname": "Fazza", "played": 0, "points": 0},
    {"player_id": 9, "name": "Paul Lynch", "nickname": "Paul", "played": 0, "points": 0},
    {"player_id": 10, "name": "Neil", "nickname": "Neil", "played": 0, "points": 0}    
  ],
  "fixtures": [
    {
      "fixture_id":1,
      "date": "17/05/2017",
      "played":true,
      "teams": {
        "team1": ['Paul Langley','Anthony Gayton','Mark Stiles','Craig Mant','Craig Mant'],
        "team2": ['Chris Corse','Elna','Chris Farrell','Chris Farrell','Neil']
      },
      "score1":10,
      "score2":0
    },
    {
      "fixture_id":2,
      "date": "24/05/2017",
      "played":false,
      "teams": {
        "team1": ['Paul Langley','Anthony Gayton','Mark Stiles','Craig Mant','Craig Mant'],
        "team2": ['Chris Corse','Elna','Chris Farrell','Chris Farrell','Neil']
      },
      "score1":0,
      "score2":0
    }
  ]
}
  
 
ReactDOM.render(
  <LeagueTableApp />,
  document.getElementById('app')
);


module.exports = App;
