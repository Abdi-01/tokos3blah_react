import React, { Component } from "react";
import axios from "axios";
import { URL_API } from "../../helper";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";




export class Register extends Component {
  onBtRegister = () => {
    let fullname = this.regisFullname.value;
    let email = this.regisEmail.value;
    let password = this.regisPass.value;
    let confPassword = this.regisConfPass.value;
    let address = this.regisAddress.value;
    let age = this.regisAge.value;
    let gender = this.regisGender.value;

    if (fullname == "" || email == "" ||  password == "" || address == "" || age == "" || gender == "" ) {
      alert("Fill in all the form");
    } else {
      axios
        .post(URL_API + "/users/regis", {
          fullname,
          email,
          password,
          address,
          age,
          gender,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1>Register now!</h1>
          <p className="lead">
            Register now and start shopping in the most affordable ecommerce
            platform
          </p>
          <div className="row mt-5">
            <div className="col-4 offset-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bold mb-3">Register</h5>
                  <input
                    className="form-control my-2"
                    placeholder="Full Name"
                    type="text"
                    ref={(el) => (this.regisFullname = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Email"
                    type="text"
                    ref={(el) => (this.regisEmail = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Password"
                    type="password"
                    ref={(el) => (this.regisPass = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Confirmation Password"
                    type="password"
                    ref={(el) => (this.regisConfPass = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Address"
                    type="text"
                    ref={(el) => (this.regisAddress = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Age"
                    type="Number"
                    ref={(el) => (this.regisAge = el)}
                  />
                  <input
                    className="form-control my-2"
                    placeholder="Male/Female"
                    type="text"
                    ref={(el) => (this.regisGender = el)}
                  />
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button
                      onClick={this.onBtRegister}
                      className="btn btn-primary mt-2"
                    >
                      Register
                    </button>
                    <Link to="/login">Or Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
