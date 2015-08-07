var React = require('react'),
    Router = require('react-router');
    Track = require('../structures/track'),
    SoundCloudAudio = require('soundcloud-audio'),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = TrackWrapper = React.createClass({
  scPlayer: {},
  currentTrackId: 0,
  redirectToDefaultValue: function() {
    console.log('default!!!');
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

    if (self.props.params.id && self.props.params.id >= 1) {
      window.JHJMeta.currentTrack = self.props.params.id;
      self.scPlayer.resolve(window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['soundcloud-url'], function (track, err) {
        deferred.resolve(track, self.scPlayer);
      });
    } else {
      window.JHJMeta.currentTrack = 1;
      window.JHJMeta.Router.transitionTo('track', { id: window.JHJMeta.currentTrack});
    }

    return deferred.promise();
  },
  render: function () {
    return (
      <div className='track-wrapper'>
        <ReactTransitionGroup component='div' className="heh-heh">
          <Track key={this.props.params.id} getTrack={this.getTrackData} />
        </ReactTransitionGroup>
        <Progress ref={'progress'} duration={ this.state.duration } />
      </div>
    );
  }
});