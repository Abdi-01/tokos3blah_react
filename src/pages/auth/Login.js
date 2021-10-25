import React from "react";
import axios from "axios";
import { URL_API } from "../../helper";
import { Link, Redirect } from "react-router-dom";
import { authLogin } from "../../actions/login";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow: "none",
      redirect: false,
      role: "",
    };
  }

  onBtLogin = () => {
    this.setState({ alertShow: "none" });
    axios
      .post(URL_API + `/users/login`, {
        email: this.inEmail.value,
        password: this.inPass.value,
      })
      .then((res) => {
        console.log("ini res login => ", res);
        sessionStorage.setItem("role", res.data.dataLogin.role);
        sessionStorage.setItem("id", res.data.dataLogin.iduser);

        console.log(res);
        localStorage.setItem("token_s3blah", res.data.token);
        if (res.data.dataLogin.role === "user") {
          this.setState({ redirect: true, role: "user" });
        } else if (res.data.dataLogin.role === "admin") {
          this.setState({ redirect: true, role: "admin" });
        } else {
          this.setState({ redirect: true, role: "super_admin" });
        }
        // menjalankan fungsi action
        this.props.authLogin(res.data.dataLogin);
        console.log(res.data.token);
        console.log(res.data.dataLogin);
        this.setState({ redirect: true });
        this.setState({ logout: true });
        console.log("Login Success ✔");
      })
      .catch((err) => {
        console.log("ini err login", err);
        this.setState({
          alertShow: "true",
        });
      });
  };

  render() {
    if (this.state.redirect) {
      console.log("Redirect");
      if (this.state.role === "admin") {
        return <Redirect to="/admin" />;
      } else if (this.state.role === "super_admin") {
        return <Redirect to="/super_admin" />;
      } else {
        return <Redirect to="/" />;
      }
    }
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
                {this.state.alertShow === "true" && (
                  <div class="alert alert-danger" role="alert">
                    Email / password yang anda masukan salah, silakan coba lagi
                    atau register jika anda belum memiliki akun
                  </div>
                )}
                <input
                  name="Email"
                  ref={(el) => (this.inEmail = el)}
                  placeholder="Email"
                  type="email"
                  className="form-control my-2"
                />
                <input
                  name="password"
                  ref={(el) => (this.inPass = el)}
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    type="button"
                    onClick={this.onBtLogin}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                  <Link to="/register">Or Register</Link>
                  <Link to="/ForgotPassword">Forgot Password</Link>
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
