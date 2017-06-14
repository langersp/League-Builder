var React = require('react');
var ReactDOM = require('react-dom');

import Header from './Header';
import LeagueTable from './LeagueTable';
import FixtureList from './FixtureList';
import FixtureForm from './FixtureForm';
import ScoreForm from './ScoreForm';
import Footer from './Footer';


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





//dummy data
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
