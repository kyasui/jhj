var React = require('react');
    TrackWrapper= require('../structures/trackwrapper'),
    Router = require('react-router');

module.exports = PlayControls = React.createClass({
  $win: $(window),
  handlePlay: function(e) {
    e.preventDefault();

    if (window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live']) {
      this.$win.trigger('hashchange');
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
    }
  },
  handlePrev: function(e) {
    e.preventDefault();

    this.goPrev(this);

    // if (self.state.canGoPrev) {
    //   window.JHJMeta.player.stop();
    //   window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) - 1});
    //   setTimeout(function() {
    //     self.setState({
    //       canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) > 1,
    //       canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
    //       isPlaying: false
    //     });
    //   }, 250);
    // }
  },
  handleNext: function(e) {
    e.preventDefault();

    this.goNext(this);

    // if (self.state.canGoNext) {
    //   window.JHJMeta.player.stop();
    //   window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) + 1});
    //   setTimeout(function() {
    //     self.setState({
    //       canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) >= 1,
    //       canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
    //       isPlaying: false
    //     });
    //   }, 250);
    // }
  },
  goNext: function(self) {
    if (self.state.canGoNext) {
      window.JHJMeta.player.stop();
      window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) + 1});
      setTimeout(function() {
        self.setState({
          canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) >= 1,
          canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
          isPlaying: false,
          isDeadTrack: window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live']
        });
      }, 250);
    }
  },
  goPrev: function(self) {
    if (self.state.canGoPrev) {
      window.JHJMeta.player.stop();
      window.JHJMeta.Router.transitionTo('track', { id: parseInt(window.JHJMeta.currentTrack) - 1});
      setTimeout(function() {
        self.setState({
          canGoPrev: parseInt(window.JHJMeta.Router.getCurrentParams().id) > 1,
          canGoNext: parseInt(window.JHJMeta.Router.getCurrentParams().id) <= parseInt(window.JHJMeta.tracks.length) - 1,
          isPlaying: false,
          isDeadTrack: window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live']
        });
      }, 250);
    }
  },
  componentDidMount: function() {
    var self = this;
    window.JHJMeta.player.stop();
    self.$win.on('hashchange', function(e) {
      self.setState({
        canGoPrev: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) > 1) : false,
        canGoNext: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) <= (parseInt(window.JHJMeta.tracks.length) - 1)) : false,
        isPlaying: window.JHJMeta.player ? window.JHJMeta.player.playing : false,
        showNav: true,
        isDeadTrack: window.JHJMeta.currentTrack ? window.JHJMeta.tracks[window.JHJMeta.currentTrack - 1]['live'] : false
      });
    }).trigger('hashchange');

    self.$win.keydown(function(e) {
      if(e.keyCode == 37) { // left
        self.goPrev(self);
      }
      else if(e.keyCode == 39) { // right
        self.goNext(self);
      }
    });
  },
  getInitialState: function(props) {
    props = props || this.props;

    return {
      showNav: false,
      canGoPrev: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) > 0) : false,
      canGoNext: window.JHJMeta.currentTrack ? (parseInt(window.JHJMeta.currentTrack) <= (parseInt(window.JHJMeta.tracks.length) - 1)) : false,
      isPlaying: window.JHJMeta.player ? window.JHJMeta.player.playing : false,
      isDeadTrack: false
    };
  },
  render: function () {
    return (
      <nav className={"play-controls js-site-controls fade-control" + (this.state.showNav ? '' : ' deactivate')}>
        <a className={"previous-button play-control-button" + (!this.state.canGoPrev ? '' : ' active')}
           onClick={ this.handlePrev }
           href="">Previous</a>
        <a className={"play-button play-control-button" + (this.state.isPlaying ? '' : ' playing') + (this.state.isDeadTrack ? '' : ' is-disabled')}
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