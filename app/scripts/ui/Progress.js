'use strict';

var React = require('react');

var Progress = React.createClass({
  maxWidth: 100,
  getInitialState: function() {
    return {
      width: 0,
      duration: 0,
      player: window.JHJMeta.player
    };
  },
  getDuration: function(duration, player) {
    this.setState({
      duration: duration,
      player: player
    });
  },
  componentDidMount: function() {
    var self = this;
    self.state.player.on('timeupdate', function (audio) {
      if (self.state.player.audio.currentTime) {
        if (Math.ceil((self.state.player.audio.currentTime / self.state.player.duration) * 100) >= self.maxWidth) {
          self.props.nextTrack();
        }
        self.setState({
          width: (self.state.player.audio.currentTime / self.state.player.duration) * 100 < self.maxWidth ? (self.state.player.audio.currentTime / self.state.player.duration) * 100 : 100
        });
      } else {
        if (Math.ceil((audio.path[0].currentTime / self.state.player.duration) * 100) >= self.maxWidth) {
          self.props.nextTrack();
        }
        self.setState({
          width: (audio.path[0].currentTime / self.state.player.duration) * 100 < self.maxWidth ? (audio.path[0].currentTime / self.state.player.duration) * 100 : 100
        });
      }
    });
  },
  render: function() {
    return (
      <div className='progress-indicator-holder'>
        <div className="progress-indicator" style={{width: this.state.width + '%'}}></div>
      </div>
    );
  }
});


module.exports = Progress;
