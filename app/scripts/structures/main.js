var React = window.React = require('react');
var TrackControls = require('../ui/TrackControls');
var PlayControls = require('../ui/PlayControls');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

module.exports = Main = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <h1 className="site-title">JOHN HEART JACKIE</h1>
          <Link className="site-info" to="info">INFO</Link>
          <a href="" className="preorder-link">PREORDER</a>
          <TrackControls/>
          <PlayControls player={ this.props.player }/>
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

