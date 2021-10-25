/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <div className="navbar-brand" href="/">
                <Link className="text-white" to="/">
                  TokoS3blah
                </Link>
              </div>
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
            </ul>
            {this.props.role ? (
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`/user/${this.props.id}`}>
                    Profile {this.props.fullname}
                  </Link>
                  <Link className="dropdown-item" to="/cart">
                    Cart
                  </Link>
                  {this.props.role == "admin" && (
                    <Link className="dropdown-item" to="/admin">
                      Admin
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <a
                  className="btn btn-outline-success btn-sm my-2 ml-2 text-white rounded"
                  href="/login"
                >
                  Login
                </a>
                |
                <Link
                  style={{ textDecoration: "none" }}
                  to="/register"
                  className="btn btn-success btn-sm my-2 ml-2"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.authReducer);
  return {
    id: state.authReducer.iduser,
    fullname: state.authReducer.fullname,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps)(Navbar);
