'use strict';

var React = require('react');

var Progress = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      maxWidth: 100,
      duration: 0,
      player: window.JHJMeta.player
    };
  },
  getDuration: function(duration, player) {
    this.setState({
      duration: duration,
      player: player
    });

    // player.on('timeupdate', function (audio) {
    //   self.setState({
    //     width: (audio.path[0].currentTime / player.duration) * 100 < self.state.maxWidth ? (audio.path[0].currentTime / player.duration) * 100 : 100
    //   });
    // });
  },
  componentDidMount: function() {
    var self = this;
    self.state.player.on('timeupdate', function (audio) {
      self.setState({
        width: (audio.path[0].currentTime / self.state.player.duration) * 100 < self.state.maxWidth ? (audio.path[0].currentTime / self.state.player.duration) * 100 : 100
      });
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
