import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser } from "./actions/authActions";
import store from "./store";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import BroylerPlate from "./components/broylerplate";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./test";

const token = localStorage.getItem("jwtToken");
if (token) {
  setAuthToken(token);
  const decodeed = jwt_decode(token);
  store.dispatch(setCurrentUser(decodeed));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/test" component={Test} />
            <Route path="/login" component={Login} />
            {/* <Route exact path="/about" component={About} /> */}
            <PrivateRoute path="/" component={BroylerPlate} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
