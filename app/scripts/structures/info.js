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
            <a target="_blank" href="http://johnheartjackie.wordpress.com/">News</a>
            <a target="_blank" href="http://www.songkick.com/artists/3370451-john-heart-jackie">Shows</a>
            <a target="_blank" href="http://johnheartjackie.bigcartel.com/">Store</a>
            <a target="_blank" href="https://www.facebook.com/johnheartjackie">Facebook</a>
            <a target="_blank" href="http://twitter.com/johnheartjackie">Twitter</a>
            <a target="_blank" href="http://instagram.com/johnheartjackie">Instagram</a>
            <a target="_blank" href="https://soundcloud.com/johnheartjackie">Soundcloud</a>
          </div>
          <p>Produced and Recorded by <a target="_blank" href="http://www.petermmurray.com/">Peter M. Murray</a><br />
          All Songs Written by Jennie Wayne and Peter M. Murray<br />
          Mixed and Mastered by <a target="_blank" href="http://heliosequence.com/">The Helio Sequence</a></p>
          <p>Photography by <a target="_blank" href="http://amandahakan.com/">Amanda Hakan</a><br />
          Videos by <a target="_blank" href="http://christiansorensenhansen.com/">Christen Sorenson Hansen</a><br />
          Styling by Chelsie Deegan<br />
          Additional Photographs by Peter M. Murray</p>
          <p>Website by <a target="_blank" href="http://dylanousley.com">Dylan Ousley</a> and <a target="_blank" href="http://www.keiyasui.com/">Kei Yasui</a></p> 
          <p>Initial Site Concepts by <a target="_blank" href="http://www.nelsonmonica.com/">Monica Nelson</a></p>
          <div className="info-overlay-links">
            <span>Contact:</span>
            <a target="_blank" href="mailto:julie@platformmusicgroup.com">Licensing</a>
            <a target="_blank" href="mailto:maggie@mixtapemedia.com">Press</a>
            <a target="_blank" href="mailto:johnheartjackie@gmail.com">Booking</a>
            <a target="_blank" href="mailto:johnheartjackie@gmail.com">General</a>
          </div>
        </div>
      </div>
    );
  }
});