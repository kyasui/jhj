var React = require('react');
    TrackWrapper= require('../structures/trackwrapper'),
    Router = require('react-router');

module.exports = PlayControls = React.createClass({
  handlePlay: function(e) {
    e.preventDefault();

    if (!this.state.isPlaying) {
      window.JHJMeta.player.play();
      this.setState({
        isPlaying: true
      });
    } else {
      window.JHJMeta.player.pause();
      this.setState({
        isPlaying: false
      });
    }
  },
  handlePrev: function(e) {
    e.preventDefault();

    var self = this;

    if (self.state.canGoPrev) {
      window.JHJMeta.player.stop();
      window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) - 1});
      setTimeout(function() {
        self.setState({
          canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) > 1,
          canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
          isPlaying: false
        });
      }, 250);
    }
  },
  handleNext: function(e) {
    e.preventDefault();

    var self = this;

    if (self.state.canGoNext) {
      window.JHJMeta.player.stop();
      window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) + 1});
      setTimeout(function() {
        self.setState({
          canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) >= 1,
          canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
          isPlaying: false
        });
      }, 250);
    }
  },
  componentDidMount: function() {
    var self = this;
    $(window).on('hashchange', function(e) {
      window.JHJMeta.player.stop();
      self.setState({
        canGoPrev: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) > 1) : false,
        canGoNext: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) <= (parseInt(window.JHJMeta.tracks.length) - 1)) : false,
        isPlaying: window.JHJMeta.player ? window.JHJMeta.player.playing : false
      });
    }).trigger('hashchange');
  },
  getInitialState: function(props) {
    props = props || this.props;

    return {
      canGoPrev: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) > 0) : false,
      canGoNext: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) <= (parseInt(window.JHJMeta.tracks.length) - 1)) : false,
      isPlaying: window.JHJMeta.player ? window.JHJMeta.player.playing : false
    };
  },
  render: function () {
    return (
      <nav className="play-controls fade-control">
        <a className={"previous-button play-control-button" + (!this.state.canGoPrev ? '' : ' active')}
           onClick={ this.handlePrev }
           href="">Previous</a>
        <a className={"play-button play-control-button" + (this.state.isPlaying ? '' : ' playing')}
          onClick={ this.handlePlay }
          playStatus={ this.state.isPlaying }
          href="">Play/Pause</a>
        <a className={"next-button play-control-button"  + (!this.state.canGoNext ? '' : ' active')}
           onClick={ this.handleNext }
           href="">Next</a>
      </nav>
    );
  }
});

module.exports = PlayControls;