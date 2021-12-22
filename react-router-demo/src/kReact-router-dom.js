import React, { Component, useContext } from "react";
import { createBrowserHistory } from "history";
import matchPath from "./matchPath";

const RouterContext = React.createContext();
const RouterProvider = RouterContext.Provider;
const RouterConsumer = RouterContext.Consumer;

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    console.log("history", this.history);
    this.state = {
      location: this.history.location,
    };
    this.unlisten = this.history.listen(location => {
      this.setState({ location });
    });
  }
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    const { children } = this.props;
    return (
      <RouterProvider
        value={{ history: this.history, location: this.state.location }}
      >
        {children}
      </RouterProvider>
    );
  }
}

//render
export function Route(props) {
  const ctx = useContext(RouterContext);
  const { location } = ctx;
  const { path, component, children, render } = props;
  const match = matchPath(location.pathname, props);
  console.log("match", match);
  const matchCurrent = match && match.isExact;
  //const matchCurrent = path === location.pathname;
  const cmpProps = { ...ctx, match };
  console.log("render", render);
  if (matchCurrent && typeof children === "function") {
    return children(cmpProps);
  }
  return (
    <>
      {typeof children === "function" && children(cmpProps)}
      {matchCurrent && component
        ? React.createElement(component, cmpProps)
        : null}
      {matchCurrent && !component && render && render(cmpProps)}
    </>
  );
}

export class Link extends Component {
  handleClick = (event, history) => {
    const { to } = this.props;
    event.preventDefault();
    history.push(to);
  };

  render() {
    const { children, to } = this.props;
    return (
      <RouterConsumer>
        {ctx => (
          <a href={to} onClick={event => this.handleClick(event, ctx.history)}>
            {children}
          </a>
        )}
      </RouterConsumer>
    );
  }
}
