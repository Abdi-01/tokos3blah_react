import React from 'react'
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar  from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verification from "./pages/auth/Verification";
import Admin from "./pages/Admin";
import Userprofile from "./pages/Userprofile";
import Home from "./pages/Home";

export class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/authentication/:token" component={Verification} />
        <Route path="/user" component={Userprofile} />
      </div>
    );
  }
}

export default App;
