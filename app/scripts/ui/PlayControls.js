var PlayControls = React.createClass({
  render: function () {
    return (
      <nav className="play-controls">
        <a className="previous-button play-control-button" href="">Previous</a>
        <a className="play-button play-control-button" href="">Play/Pause</a>
        <a className="next-button play-control-button" href="">Next</a>
      </nav>
    );
  }
});

module.exports = PlayControls;