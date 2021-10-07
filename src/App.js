import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

// import { Navbar } from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/Admin";
import Userprofile from "./pages/Userprofile";
// import Home from "./pages/Home";
import './App.css';
import LandingPage from './pages/landingPage' //import pages 
import Navbar from './components/navbar'
// import DetailPage from './pages/detailAlbum';
// import LoginPage from './pages/loginPage';
// import VerificationPage from './pages/verification';
// import UserList from './pages/registerPage';

export class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar />
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" component={LandingPage} exact />
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={Userprofile} />
      {/* <Route path="/authentication/:token" component={VerificationPage} /> */}
      {/* <Route path="/user-list" component={UserList} /> */}
      {/* <Route path="/account" component={LoginPage} /> */}
      {/* <Route path="/detail-album" component={DetailPage} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
