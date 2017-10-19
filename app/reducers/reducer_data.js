import _ from 'lodash';
import { FETCH_DATA } from '../actions'


export default function(state = {}, action) {
	switch(action.type) {
	case FETCH_DATA:

		//use loadash to turn array into object. i.e. Key is Fixture ID and object is entire fixture
		// this allows us to easily lookup a fixture i.e id lookup of state["4"]
		//_.mapKeys(fixtures, 'fixture_id');
		console.log(action.payload.data)
		let data = {
			fixtures: _.mapKeys(action.payload.data[0].fixtures, 'fixture_id'),
			players: _.mapKeys(action.payload.data[0].players, 'player_id'),
		}
		console.log(data)
		return data;
		//use loadash to turn array into object. i.e. Key is Fixture ID and object is entire fixture
		// this allows us to easily lookup a fixture i.e id lookup of state["4"]
		//_.mapKeys(fixtures, 'fixture_id');
	
	default:
		return state
	}
}