'use strict';

var React = require('react');

var Progress = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      maxWidth: 100,
      duration: 0
    };
  },
  getDuration: function(duration, player) {
    var self = this;

    player.on('timeupdate', function (audio) {
      self.setState({
        width: (audio.path[0].currentTime / player.duration) * 100 < self.state.maxWidth ? (audio.path[0].currentTime / player.duration) * 100 : 100
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
