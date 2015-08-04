var React = require('react'),
    Router = require('react-router');
    Track = require('../structures/track'),
    SoundCloudAudio = require('soundcloud-audio');

var Link = Router.Link;

module.exports = TrackWrapper = React.createClass({
  scPlayer: {},
  currentTrackId: 0,
  getInitialState: function() {
    return {
      trackData: {}
    };
  },
  initSoundCloud: function() {
    this.scPlayer = new SoundCloudAudio(window.JHJMeta.config.soundcloud_client_id);
    window.JHJMeta.player = this.scPlayer;
  },
  componentWillMount: function() {
    this.initSoundCloud();
  },
  getTrackData: function() {
    var self = this;
    window.JHJMeta.currentTrack = self.props.params.id;

    if (self.props.params.id && self.props.params.id >= 1) {
      self.scPlayer.resolve(window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['soundcloud-url'], function (track, err) {
        self.refs.track.getTrackInfo(track, self.scPlayer);
      });
    } else {
      window.JHJMeta.currentTrack = 1;
      window.JHJMeta.Router.transitionTo('track', { id: window.JHJMeta.currentTrack});
    }
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