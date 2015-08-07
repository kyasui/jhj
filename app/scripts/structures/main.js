var React = window.React = require('react/addons');
var TrackControls = require('../ui/TrackControls');
var PlayControls = require('../ui/PlayControls');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


module.exports = Main = React.createClass({
  componentDidMount: function() {
    var idleTimer = null,
        idleState = false,
        idleWait = 3500;

    $(document).on('mousemove', function(e) {
      var $siteControls = $('.js-site-controls');

      clearTimeout(idleTimer);
      if (idleState) {
        $siteControls.addClass('active-controls');
      }
      idleState = false;
      idleTimer = setTimeout(function () {
        $siteControls.removeClass('active-controls');
        idleState = true;
      }, idleWait);
    }).trigger('mousemove');
  },
  render: function () {
    return (
      <div>
        <header className="js-site-controls active-controls">
          <h1 className="site-title fade-control">JOHN HEART JACKIE</h1>
          <Link className="site-info fade-control" to="info">INFO</Link>
          <a href="" className="preorder-link fade-control">PREORDER</a>
          <TrackControls/>
          <PlayControls player={ this.props.player }/>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});

