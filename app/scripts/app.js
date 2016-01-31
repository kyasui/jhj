var React = window.React = require('react'),
    router = require('./routes/router'),
    routes = router.routes,
    config = require('./config/config');

$.when(config.getConfig()).done(function(result) {
  window.JHJMeta = null;
  window.JHJMeta = result;
  window.isAnimating = false;
  window.isPaused = false;
  window.JHJMeta.Router = router.init();
});