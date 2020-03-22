import React, { Fragment } from "react";
import Login from "./pages/login/Login";
import "./App.css";
import ManagmentHome from "./pages/home/ManagmentHome";
import { requireSignIn, notLogin } from "./guards/managmentGuard";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <GuardProvider guards={[notLogin]}>
            <GuardedRoute
              exact
              path="/"
              render={props => (
                <Login {...props}/>
              )}
            />
            <GuardedRoute
              exact
              path="/signup"
              render={props => (
                <Login {...props}/>
              )}
            />
            <GuardProvider guards={[requireSignIn]}>
              <GuardedRoute
                exact
                path="/home"
                render={props => <ManagmentHome {...props} />}
              />
            </GuardProvider>
          </GuardProvider>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
