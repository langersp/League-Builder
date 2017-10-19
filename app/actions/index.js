import axios from 'axios';

export const FETCH_DATA = 'fetch_data';

export function fetchData() {

	const request = axios.get('/api/leaguedata');

	//redux promise middleware will automatically resolve the request

	return {
		type: FETCH_DATA,
		payload: request
	};
}