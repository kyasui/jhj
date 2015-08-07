/*******
JUST GOT THE ANIMATIONS TO WORK WITH CALLBACKS. ADD SOME GREENSOCK or VELOCITY STUFF HERE.
******/


var React = require('react'),
    Router = require('react-router'),
    SoundCloud = require('../services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("../ui/Progress"),
    ReactTransitionGroup = React.addons.TransitionGroup;

var Link = Router.Link;

module.exports = Track = React.createClass({
  scPlayer: {},
  currentTrackID: 0,
  getInitialState: function() {
    return {
      duration: 0,
      track_id: ''
    };
  },
  getTrackInfo: function(track, player) {
    var self = this;
    $.when(this.props.getTrack()).done(function(result, player) {
      self.setState({
        duration: result.duration,
        track_id: result.title
      });
      // self.refs.progress.getDuration(result.duration, player);
    });
  },
  componentWillAppear: function(callback) {
    console.log('Will Appear');
    setTimeout(callback, 500);
  },
  componentDidAppear: function() {
    console.log('Did Appear');
  },
  componentWillEnter: function(callback) {
    console.log('Will Enter');
    setTimeout(callback, 500);
  },
  componentDidEnter: function() {
    console.log('Did Enter');
  },
  componentWillLeave: function(callback) {
    console.log('Will Leave');
    setTimeout(callback, 500);
  },
  componentDidLeave: function() {
    console.log('Did Leave');
  },
  componentDidMount: function() {
    this.getTrackInfo();
  },
  render: function () {
    return (
      <div className='track'>
        <h1>{ this.state.track_id }</h1>
      </div>
    );
  }
});