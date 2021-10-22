import React, { Component } from "react";
import User_data from "../components/User_data";
import Form_alamat from "../components/Form_alamat";

export class Userprofile extends Component {
  render() {
    return (
      <div className="container mt-3">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Profile
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="alamat-tab"
              data-toggle="tab"
              href="#alamat"
              role="tab"
              aria-controls="alamat"
              aria-selected="false"
            >
              Alamat
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="container mt-3">
              <User_data />
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="alamat"
            role="tabpanel"
            aria-labelledby="alamat-tab"
          >
            <div className="container mt-3">
              <Form_alamat />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Userprofile;
