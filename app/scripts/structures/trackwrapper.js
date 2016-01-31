var React = require('react'),
    Router = require('react-router');
    Track = require('../structures/track'),
    SoundCloudAudio = require('soundcloud-audio'),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = TrackWrapper = React.createClass({
  scPlayer: {},
  currentTrackId: 0,
  previousTrackId: 0,
  redirectToDefaultValue: function() {

  },
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
  componentDidMount: function() {

  },
  getTrackData: function() {
    var deferred = $.Deferred(),
        self = this;

    this.previousTrackId = window.JHJMeta.currentTrack;

    if (self.props.params.id && self.props.params.id >= 1 && self.props.params.id <= window.JHJMeta.tracks.length) {
      window.JHJMeta.currentTrack = self.props.params.id;
      this.currentTrackId = self.props.params.id;

      self.scPlayer.resolve(window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['soundcloud-url'], function (track, err) {
        deferred.resolve(track, self.scPlayer);
      });
    } else {
      window.JHJMeta.currentTrack = 1;
      window.JHJMeta.Router.transitionTo('track', { id: window.JHJMeta.currentTrack});
    }

    return deferred.promise();
  },
  nextTrack: function() {
    if (window.JHJMeta.currentTrack <= window.JHJMeta.tracks.length - 1) {
      window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) + 1});
    } else {
      // Do something special signifiying the end of the playlist.
    }
  },
  getDirection: function () {
    var direction = parseInt(this.currentTrackId) - parseInt(this.previousTrackId);
    return direction;
  },
  render: function () {
    return (
      <div className='track-wrapper'>
        <ReactTransitionGroup component='div'>
          <Track ref={'track'} key={this.props.params.id} getTrack={this.getTrackData} getDirection={this.getDirection}/>
        </ReactTransitionGroup>
        <Progress ref={'progress'} duration={this.state.duration} nextTrack={this.nextTrack}/>
        <div className='track-progress-bar'>
          <div className='track-progress-bar-content'>
            <h3 className='track-progress-label'>Loading...</h3>
            <div className='track-progress-bar-holder'>
              <div className='track-progress-bar-fill'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});