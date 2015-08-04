var React = require('react'),
    Router = require('react-router'),
    SoundCloud = require('../services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("../ui/Progress");

var Link = Router.Link;

module.exports = Track = React.createClass({
  scPlayer: {},
  currentTrackID: 0,
  getInitialState: function() {
    return {
      duration: 0,
      track_id: 'NOPE'
    };
  },
  getTrackInfo: function(track, player) {
    this.setState({
      duration: track.duration,
      track_id: track.title
    });

    this.refs.progress.getDuration(track.duration, player);
  },
  render: function () {
    return (
      <div className='track'>
        <h1>Track # { this.state.track_id }</h1>
        <Progress ref={'progress'} duration={ this.state.duration } />
      </div>
    );
  }
});