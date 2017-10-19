var React = require('react');
var ReactDOM = require('react-dom');

import Header from './Header';
import LeagueTable from './LeagueTable';
import FixtureList from './FixtureList';
import FixtureForm from './FixtureForm';
import ScoreForm from './ScoreForm';
import PlayerForm from './PlayerForm';
import Footer from './Footer';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class LeagueTableApp extends React.Component {

  constructor(props) {
    super(props);

    //lifting state up - source of truth for other components.
    this.state = {
      data: [
        {
         players: [],
         fixtures: [] 
        }
      ]
    };
    this.handleFixtureSubmit = this.handleFixtureSubmit.bind(this);
    this.handleScoreSubmit = this.handleScoreSubmit.bind(this);
    this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
  }

  componentWillMount() {
   
  }

  componentDidMount() {

    fetch('/api/leaguedata', {
      method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      // data is a JavaScript object
      this.setState({data: data}) 
      console.log(data)
    }.bind(this)).catch(function(err) {
      // Error :(
      console.log(err)
    });

  }

  handleFixtureSubmit(team1, team2) {
  
    var teams = {
      "team1": JSON.stringify(team1),
      "team2": JSON.stringify(team2)
    }
      
    var request = new Request('/api/leaguedata', {
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(teams)
    });

    console.log("Adding fixture:", teams);
    fetch(request).then(function(response) {
        return response.json();
    }).then(function(data) {
      // data is a JavaScript object
      this.setState({data: data}) 
      
      // console.log(data)
      // var fixture = data[0].fixtures[0];

      // var newData = this.state;
      // console.log(newData)
      //   // We're advised not to modify the state, it's immutable. So, make a copy.
      // var fixtureModified = this.state.data[0].fixtures.concat(fixture);
      // newData.fixtures = fixtureModified;

      // console.log(newData)
      // this.setState({data: newData});

    }.bind(this)).catch(function(err) {
      // Error :(
       console.log(err)
    });

  }

  handleScoreSubmit(score, fixtureId) {
    // var newArray = this.state.data;
    // console.log(newArray)
    // for(var key in newArray.fixtures) {
    //   console.log(fixtureId)
    //   if((parseInt(key)+1) == fixtureId) {
        
    //     console.log("match")
    //     //newArray[fixtureId - 1].score1 = 3;
    //     newArray.fixtures[fixtureId - 1].score1 = score.score1;
    //     newArray.fixtures[fixtureId - 1].score2 = score.score2;
    //     newArray.fixtures[fixtureId - 1].played = true;
    //     this.setState({data: newArray})

    //   }
    // }
    //newArray.fixtures.push(fix);
   // this.setState({data: })
   console.log(score);

  var scoreData = {
    "score": score,
    "fixtureid": fixtureId
  };
  console.log(scoreData)

  var request = new Request('/api/updatefixture', {
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(scoreData)
    });


    //console.log("Adding fixture:", newPlayerDataArray);
    fetch(request).then(function(response) {
        return response.json();
    }).then(function(data) {
      // data is a JavaScript object
      this.setState({data: data}) 
      console.log(data)
    }.bind(this)).catch(function(err) {
      // Error :(
       console.log(err)
    });

  }

  handlePlayerSubmit(player) {
    var request = new Request('/api/addplayer', {
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(player)
    });

    fetch(request).then(function(response) {
         console.log(response)
        return response.json();
    }).then(function(data) {
      // data is a JavaScript object
      this.setState({data: data}) 
      console.log("success")
    }.bind(this)).catch(function(err) {
      // Error :(
       console.log(err)
    });
  }

	render() {
		
    const FixtureListDisplay = () => {
      return (
         <FixtureList players={this.state.data[0].players} fixtures={this.state.data[0].fixtures} onScoreFormSubmit={this.handleScoreSubmit}  />
      );
    }
    const LeagueTableDisplay = () => {
      return (
          <LeagueTable players={this.state.data[0].players} fixtures={this.state.data[0].fixtures} />
      );
    }
    const FixtureFormDisplay = () => {
      return (
          <FixtureForm players={this.state.data[0].players} fixtures={this.state.data[0].fixtures} onFixtureFormSubmit={this.handleFixtureSubmit}  />
      );
    }
    const PlayerFormDisplay = () => {
      return (
          <PlayerForm onPlayerFormSubmit={this.handlePlayerSubmit}  />
      );
    }

    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={LeagueTableDisplay}/>
            <Route path='/fixtures' component={FixtureListDisplay} />
            <Route path='/addfixture' component={FixtureFormDisplay} />
            <Route path='/addplayer' component={PlayerFormDisplay} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
	}
}