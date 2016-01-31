var React = window.React = require('react/addons');
var TrackControls = require('../ui/TrackControls');
var PlayControls = require('../ui/PlayControls');
var Info = require('../structures/info');
var Purchase = require('../structures/purchase');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


module.exports = Main = React.createClass({
  getInitialState: function() {
    return {
      showOverlay: false,
      showPurchase: false
    };
  },
  showOverlay: function(e) {
    e.preventDefault();

    this.setState({
      showOverlay: !this.state.showOverlay
    });
  },
  showPurchase: function(e) {
    e.preventDefault();

    this.setState({
      showPurchase: !this.state.showPurchase
    });
  },
  componentDidMount: function() {
    var idleTimer = null,
        idleState = false,
        idleWait = 2000;

    var $siteControls = $('.js-site-controls');

    setTimeout(function() {
      $siteControls.addClass('active-controls');
    }, 500);

    $(document).on('mousemove', function(e) {
      clearTimeout(idleTimer);
      idleTimer = 0;
      if (idleState) {
        if (!$siteControls.hasClass('active-controls')) {
          $siteControls.addClass('active-controls');
        }
      }
      idleState = false;
      idleTimer = setTimeout(function () {
        if ($siteControls.hasClass('active-controls')) {
          $siteControls.removeClass('active-controls');
        }
        idleState = true;
      }, idleWait);
    }).trigger('mousemove');
  },
  render: function () {
    return (
      <div>
        <header className='js-site-controls'>
          <Link className='site-title fade-control' to='track' params={{id: '1'}}>JOHN HEART JACKIE</Link>
          <a href='' onClick={this.showOverlay} className='site-info fade-control'>INFO</a>
          <a href='' onClick={this.showPurchase} className='preorder-link fade-control'>BUY NOW</a>
          <TrackControls/>
          <PlayControls player={ this.props.player }/>
        </header>
        <RouteHandler/>
        <Info showOverlay={this.state.showOverlay} handleClose={this.showOverlay}/>
        <Purchase showPurchase={this.state.showPurchase} handleClose={this.showPurchase}/>
      </div>
    );
  }
});

