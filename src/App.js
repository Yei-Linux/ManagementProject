import React, { Fragment } from "react";
import Login from "./pages/login/Login";
import "./App.css";
import ManagmentHome from "./pages/home/ManagmentHome";
import { requireSignIn, notLogin } from "./guards/managmentGuard";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import ProjectState from "./context/project/projectState";
import TaskState from "./context/task/taskState";
import DrawerState from "./context/drawer/drawerState";

function App() {
  return (
    <ProjectState>
      <DrawerState>
        <TaskState>
          <Router>
            <Fragment>
              <Switch>
                <GuardProvider guards={[notLogin]}>
                  <GuardedRoute
                    exact
                    path="/"
                    render={props => <Login {...props} />}
                  />
                  <GuardedRoute
                    exact
                    path="/signup"
                    render={props => <Login {...props} />}
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
        </TaskState>
      </DrawerState>
    </ProjectState>
  );
}

export default App;
