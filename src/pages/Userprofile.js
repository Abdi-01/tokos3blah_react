import React, { Component } from "react";
import Form_user from "../components/Form_user";
import User_data from "../components/User_data";

export class Userprofile extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  User Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  Alamat
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg">
                <Form_user />
                {/* <User_data /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Userprofile;
