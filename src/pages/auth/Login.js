import React, { Component } from "react";
import axios from "axios";
import { URL_API } from "../../helper";
import { Link, Redirect } from "react-router-dom";
import { authLogin } from "../../actions/login";
import { connect } from "react-redux";

export class Login extends Component {
      state = {
            alertShow: 'none',
            redirect: false
        }
    

    onBtLogin = () => {
        axios.post(URL_API + `/users/login`, {
            email: this.inEmail.value,
            password: this.inPass.value
        })
            .then(res => {
                // menjalankan fungsi action
                this.props.authLogin(res.data.dataLogin)
                this.setState({ redirect: true })
                console.log('Login Success ✔')
                this.inUsername.value = ''
                this.inPass.value = ''
            })
            .catch(err => console.log(err))
    };

  
  render() {
    return (

 <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Login now!</h1>
            <p className="lead">
              Login now and start shopping in the most affordable ecommerce
              platform
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            {/* {
              this.props.userGlobal.errMsg ?
              <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div>
              : null
            } */}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Login</h5>
                <input
                  name="username"
                   ref={el => this.inEmail = el}
                  placeholder="Username"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  name="password"
                   ref={el => this.inPass = el}
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={this.onBtLogin} className="btn btn-primary mt-2">Login</button>
                  <Link to="/register">Or Register</Link>
                  <Link to="/">Forgot Password</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
               
        );
  }
}

export default connect(null, { authLogin })(Login);
