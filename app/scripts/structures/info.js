var React = require('react'),
    Router = require('react-router');

var Link = Router.Link;

module.exports = Inbox = React.createClass({
  render: function () {
    return (
      <div className={'info-overlay' + (this.props.showOverlay ? ' show' : '')}>
        <a href="" onClick={this.props.handleClose} className="info-overlay-close">Close Overlay</a>
        <div className="info-overlay-content">
          <h2 className="info-overlay-title">INFO</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis facilisis sem pharetra auctor. Sed condimentum, neque et egestas porta, nibh felis consectetur felis, quis aliquam eros neque sit amet mauris. Vestibulum lacinia felis vel porta tincidunt. Integer justo nunc, ultrices vitae turpis id, viverra porta lectus. Nunc a tempus justo. In non luctus leo, a facilisis magna. Ut id enim purus. Quisque sed tortor tellus. Donec id erat odio. Integer facilisis mi justo, ut eleifend tortor porttitor euismod.</p>
          <p>Integer justo nunc, ultrices vitae turpis id, viverra porta lectus. Nunc a tempus justo. In non luctus leo, a facilisis magna. Ut id enim purus. Quisque sed tortor tellus. Donec id erat odio. Integer facilisis mi justo, ut eleifend tortor porttitor euismod.</p>
          <div className="info-overlay-links">
            <a href="">News</a>
            <a href="">Shows</a>
            <a href="">Soundcloud</a>
            <a href="">Twitter</a>
            <a href="">Instagram</a>
            <a href="">Facebook</a>
          </div>
        </div>
      </div>
    );
  }
});