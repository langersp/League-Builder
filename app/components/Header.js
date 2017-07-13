var React = require('react');
var ReactDOM = require('react-dom');

import { Link } from 'react-router-dom'


export default class Header extends React.Component {
  render() {
    return (
      <header><nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/fixtures'>Fixtures</Link></li>
        <li><Link to='/addfixture'>Add a Fixture</Link></li>
        <li><Link to='/addplayer'>Add a Player</Link></li>
      </ul>
    </nav></header>
    )
  }
}