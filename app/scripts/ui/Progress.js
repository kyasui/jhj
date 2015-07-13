'use strict';

var React = require('react');

var Progress = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      maxWidth: 100
    };
  },
  tick: function() {
    this.setState({
      width: this.state.width < this.state.maxWidth ? this.state.width + 1 : 100});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 100);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div className='progress-indicator-holder'>
        <div className="progress-indicator" style={{width: this.props.width + '%'}}></div>
      </div>
    );
  }
});


module.exports = Progress;
