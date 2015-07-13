
var React = window.React = require('react'),
    SoundCloud = require('./services/soundcloud'),
    SoundCloudAudio = require('soundcloud-audio');
    Progress = require("./ui/Progress"),
    mountNode = document.getElementById("app");

// SC.initialize({
//   client_id: '0cce230090ea9f221e0d56acb69875d6'
// });


var PlayButton = React.createClass({
  render: function() {
    return <a onClick={this.props.onClick} href="">{this.props.playText}</a>
  }
});

var JHJ = React.createClass({
  initSoundCloud: function() {
    scPlayer = new SoundCloudAudio('0cce230090ea9f221e0d56acb69875d6');
    scPlayer.preload('https://api.soundcloud.com/tracks/207293967/stream');
    console.log(scPlayer.duration);

    scPlayer.on('timeupdate', function (audio) {
      console.log(Math.floor(audio.path[0].currentTime));
    });
  },
  handlePlay: function(e) {
    e.preventDefault();

    console.log(this.state.isPlaying);

    if (!this.state.isPlaying) {
      scPlayer.play();
      this.setState({
        isPlaying: true,
        playText: 'PAUSE'
      });
    } else {
      scPlayer.pause();
      this.setState({
        isPlaying: false,
        playText: 'PLAY'
      });
    }
  },
  componentDidMount: function() {
    this.initSoundCloud();
  },
  getInitialState: function(props) {
    props = props || this.props;

    return {
      scPlayer: {},
      playText: 'PLAY',
      isPlaying: false,
      playFunction: this.handlePlay
    };
  },
  render: function() {
    return (
      <div>
        <h3>SOUND</h3>
        <PlayButton
          onClick={this.state.playFunction}
          playText={this.state.playText}
          playStatus={this.state.isPlaying} />
        <Progress />
      </div>
    );
  }
});


React.render(<JHJ />, mountNode);

