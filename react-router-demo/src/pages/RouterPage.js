import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./LoginPage";

function Detail() {
  return (
    <div>
      <h1>Detail</h1>
    </div>
  );
}

function Search(props) {
  console.log("props", props);
  const { id } = props.match.params;
  return (
    <div>
      <h1>Search:{id}</h1>
      <Link to="/search/detail">详情：{id}</Link>
      <Route path="/search/detail" component={Detail} />
    </div>
  );
}

export default class RouterPage extends Component {
  render() {
    const searchId = 123;
    return (
      <div>
        <h1>RouterPage</h1>
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to={"/search/" + searchId}>搜索</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/user" component={UserPage} /> */}
            <PrivateRoute path="/user" component={UserPage} />
            <Route path="/search/:id" component={Search} />
            <Route path="/login" component={LoginPage} />
            <Route component={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
