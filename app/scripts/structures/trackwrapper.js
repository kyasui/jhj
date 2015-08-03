var React = require('react'),
    Router = require('react-router');
    Track = require('../structures/track'),
    SoundCloudAudio = require('soundcloud-audio');

var Link = Router.Link;

module.exports = TrackWrapper = React.createClass({
  scPlayer: {},
  currentTrackId: 0,
  getInitialState: function() {
    console.log(this);
    return {
      trackData: {}
    };
  },
  initSoundCloud: function() {
    this.scPlayer = new SoundCloudAudio(window.JHJMeta.config.soundcloud_client_id);
  },
  componentWillMount: function() {
    this.initSoundCloud();
  },
  getTrackData: function() {
    var self = this;
    self.scPlayer.resolve(window.JHJMeta.tracks[this.props.params.id]['soundcloud-url'], function (track, err) {
      self.refs.track.getTrackInfo(track, self.scPlayer);
    });
  },
  render: function () {
    this.getTrackData();

    return (
      <div className='track-wrapper'>
        <Track ref={'track'} />
      </div>
    );
  }
});