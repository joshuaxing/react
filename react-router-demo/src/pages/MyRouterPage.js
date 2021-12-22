import React, { Component } from "react";
// import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { BrowserRouter, Link, Route } from "../kReact-router-dom";

import HomePage from "./HomePage";
import UserPage from "./UserPage";

export default class MyRouterPage extends Component {
  render() {
    return (
      <div>
        <h1>MyRouterPage</h1>
        <Foo />
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
          </nav>
          <Route
            exact
            path="/"
            component={HomePage}
            children={() => <div>home children</div>}
          />
          <Route
            path="/user"
            component={UserPage}
            render={() => <div>User Render</div>}
          />
        </BrowserRouter>
      </div>
    );
  }
}
//<></>

function Foo() {
  return (
    <>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </>
  );
}
