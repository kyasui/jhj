var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

var TrackControls = React.createClass({
  render: function () {
    var nav_links = window.JHJMeta.tracks.map(function(track, index) {
      return(
        <Link to="track" params={{id: index + 1}}>{index + 1}</Link>
      )
    });

    return (
      <nav className="track-controls">
        {nav_links}
      </nav>
    );
  }
});

module.exports = TrackControls;