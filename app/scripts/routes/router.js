'use strict';

var React = window.React = require('react'),
    Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Main = require('../structures/main');
var Info = require('../structures/info');


var routes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="info" handler={Info}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

module.exports = {
  RouteHandler: RouteHandler,
  Link: Link,
  Route: Route,
  routes: routes,
  Router: Router
};