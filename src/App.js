import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/Admin";
import Userprofile from "./pages/Userprofile";
import Home from "./pages/Home";

export class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={Userprofile} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
