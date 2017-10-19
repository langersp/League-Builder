import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';

class FixturesIndex extends Component {

	//automatically called by react when component rendered to DOM
	componentDidMount() {
		this.props.fetchData();
console.log(this.props)
	}

	renderFixtures() {
		//use lodash map function as we are dealing with an object and not an array so can't use .map
		return _.map(this.props.fixtures, (fixture) => {
			return (
			<li key={fixture.fixture_id}>
				{fixture.date}
			</li>
			)
		});
	}

	renderPlayers() {
		//use lodash map function as we are dealing with an object and not an array so can't use .map
		return _.map(this.props.players, (player) => {
			return (
			<li key={player.player_id}>
				{player.name}
			</li>
			)
		});
	}

	render() {
		

		return (
			<div>
				<h3>Fixtures</h3>
				{this.renderFixtures()}
				<h3>Players</h3>
				{this.renderPlayers()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		fixtures: state.data.fixtures,
		players: state.data.players
	}
}

export default connect(mapStateToProps, { fetchData })(FixturesIndex);