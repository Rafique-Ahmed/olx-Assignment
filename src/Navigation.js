import React from "react";
import Home from "./Home";
import Sell from "./sell";
import Adds from "./myAdds";
import Signup from "./Signup";
import Forget from "./Forget";
import Login from "./Login/login";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Signup />
        </Route>

        <Route path="/forget">
          <Forget />
        </Route>

        <Route path="/Home">
          <Home />
        </Route>

        <Route path="/Sell">
          <Sell />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/myAdds">
          <Adds />
        </Route>
      </Router>
    );
  }
}
