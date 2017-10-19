import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';
//import LeagueTableApp from './components/App'

import rootReducer from './reducers';
import FixturesIndex from './components/fixtures_index';
import FixtureForm from './components/FixtureForm'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// ReactDOM.render((
//   <BrowserRouter>
//   	<FixturesIndex />
//   </BrowserRouter>
// ), document.getElementById('app'));
//div added because react router causes
ReactDOM.render(
	<Provider store={createStoreWithMiddleware(rootReducer)}>
		 <BrowserRouter>
		 	<div>
		  		<Route path="/" component={FixturesIndex} />
		  		<Route path="/fixtures/new" component={FixtureForm} />
		  	</div>
		 </BrowserRouter>
	</Provider>
	, document.getElementById('app'));