var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

module.exports = Inbox = React.createClass({
  render: function () {
    return (
      <div className={'info-overlay' + (this.props.showOverlay ? ' show' : '')}>
        <a href="" onClick={this.props.handleClose} className="info-overlay-close">Close Overlay</a>
        <div className="info-overlay-content">
          <h2 className="info-overlay-title">INFO</h2>
          <div className="info-overlay-links">
            <span>Contact:</span><a href="julie@platformmusicgroup.com">Licensing</a> | <a href="maggie@mixtapemedia.com">Press</a> | <a href="johnheartjackie@gmail.com">Booking</a> | <a href="johnheartjackie@gmail.com">General</a>
          </div>
          <p>Produced and Recorded by Peter M. Murray<br />
          All Songs Written by Jennie Wayne and Peter M. Murray<br />
          Mixed and Mastered by The Helio Sequence</p>
          <p>Photography by Amanda Hakan<br />
          Videos Directed by Christen Sorenson Hansen<br />
          Styling by Chelsie Deegan<br />
          Additional Photographs by Peter M. Murray</p>
          <p>Website by Dylan Ousley and Kei Yasui</p> 
          <p>Executive Creative Concepts by Monica Nelson</p>
          <div className="info-overlay-links">
            <a target="_blank" href="http://johnheartjackie.wordpress.com/">News</a>
            <a target="_blank" href="http://www.songkick.com/artists/3370451-john-heart-jackie">Shows</a>
            <a target="_blank" href="http://johnheartjackie.bigcartel.com/">Store</a>
            <a target="_blank" href="https://www.facebook.com/johnheartjackie">Facebook</a>
            <a target="_blank" href="http://twitter.com/johnheartjackie">Twitter</a>
            <a target="_blank" href="http://instagram.com/johnheartjackie">Instagram</a>
            <a target="_blank" href="https://soundcloud.com/johnheartjackie">Soundcloud</a>
          </div>
        </div>
      </div>
    );
  }
});