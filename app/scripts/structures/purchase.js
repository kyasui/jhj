var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

module.exports = Purchase = React.createClass({
  render: function () {
    return (
      <div className={'info-overlay' + (this.props.showPurchase ? ' show' : '')}>
        <a href="" onClick={this.props.handleClose} className="info-overlay-close">Close Overlay</a>
        <div className="info-overlay-content purchase-content">
          <a className="info-overlay-title float-left" target="_blank" href="https://itunes.apple.com/us/album/episodes/id1063130372">ITUNES</a>
          <div className="sep"></div>
          <a className="info-overlay-title float-right" target="_blank" href="http://johnheartjackie.bigcartel.com/product/episodes-vinyl">VINYL LP</a>
        </div>
      </div>
    );
  }
});