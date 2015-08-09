'use strict';

var React = window.React = require('react'),
    Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;
var Main = require('../structures/main');
var TrackWrapper= require('../structures/trackwrapper');


var routes = (
  <Route name="main" path="/" handler={Main}>
    <Route ignoreScrollBehavior={true} name="track" path="track/:id" handler={TrackWrapper}/>
    <Redirect from="/" to="track"  params={{id: 1}} />
  </Route>
);

module.exports = {
  init: function() {
    return Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  },
  RouteHandler: RouteHandler,
  Link: Link,
  Route: Route,
  routes: routes,
  Router: Router
};