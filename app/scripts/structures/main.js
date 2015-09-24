var React = window.React = require('react/addons');
var TrackControls = require('../ui/TrackControls');
var PlayControls = require('../ui/PlayControls');
var Info = require('../structures/info');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


module.exports = Main = React.createClass({
  getInitialState: function() {
    return {
      showOverlay: false
    };
  },
  showOverlay: function(e) {
    e.preventDefault();
    console.log('clicked');

    console.log(this.state.showOverlay);

    this.setState({
      showOverlay: !this.state.showOverlay
    });
  },
  componentDidMount: function() {
    var idleTimer = null,
        idleState = false,
        idleWait = 1000;

    $(document).on('mousemove', function(e) {
      var $siteControls = $('.js-site-controls');
      clearTimeout(idleTimer);
      idleTimer = 0;
      if (idleState) {
        $siteControls.addClass('active-controls');
      }
      idleState = false;
      idleTimer = setTimeout(function () {
        $siteControls.removeClass('active-controls');
        idleState = true;
      }, idleWait);
    });
  },
  render: function () {
    return (
      <div>
        <header className='js-site-controls active-controls'>
          <Link className='site-title fade-control' to='track' params={{id: '1'}}>JOHN HEART JACKIE</Link>
          <a href='' onClick={this.showOverlay} className='site-info fade-control'>INFO</a>
          <a href='http://johnheartjackie.bigcartel.com/product/episodes-vinyl' target='_blank' className='preorder-link fade-control'>PREORDER</a>
          <TrackControls/>
          <PlayControls player={ this.props.player }/>
        </header>
        <RouteHandler/>
        <Info showOverlay={this.state.showOverlay} handleClose={this.showOverlay}/>
      </div>
    );
  }
});

