/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <di className="navbar-brand" href="/">
            <Link to="/">TokoS3blah</Link>
          </di>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Kategori <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <form>
                  <div class="input-group mb-3 my-auto">
                    <input
                      type="text"
                      class="form-control pt-0"
                      placeholder="Cari Barang"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      class="btn btn-success text-lg"
                      type="button"
                      id="button-addon2"
                    >
                      cari
                    </button>
                  </div>
                </form>
              </li>
            </ul>

            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/user">
                  Profile {this.props.fullname}
                </a>
                <a className="dropdown-item" href="#">
                  Cart
                </a>
                {this.props.role == "admin" && (
                  <a className="dropdown-item" href="/admin">
                    Admin
                  </a>
                )}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </div>
            <div>
              <a
                className="btn btn-outline-success btn-sm my-2 ml-2 text-white rounded"
                href="/login"
              >
                Login
              </a>
              |
              <a className="btn btn-success btn-sm my-2 ml-2" href="/register">
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fullname: state.authReducer.fullname,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps)(Navbar);
