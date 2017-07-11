var React = require('react');
var ReactDOM = require('react-dom');

import { BrowserRouter } from 'react-router-dom';
import LeagueTableApp from './components/App'

ReactDOM.render((
  <BrowserRouter>
  	<LeagueTableApp />
  </BrowserRouter>
), document.getElementById('app'));