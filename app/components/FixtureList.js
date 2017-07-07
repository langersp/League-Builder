var React = require('react');
var ReactDOM = require('react-dom');

import Fixture from './Fixture';

export default class FixtureList extends React.Component {

  render() {  
    var fixtureList = [],
    scheduledList = [];

    this.props.fixtures.forEach((fixture) => {
      if(fixture.played==true) {
        fixtureList.push(<Fixture players={this.props.players} fixture={fixture} key={fixture.fixture_id} />);
      } else {
        scheduledList.push(<Fixture players={this.props.players} fixture={fixture} key={fixture.date} onScoreFormSubmit={this.props.onScoreFormSubmit} />);
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
