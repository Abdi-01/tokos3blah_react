import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import { Link } from "react-router-dom";

import Axios from "axios";
import { URL_API } from "../helper";
import { connect } from "react-redux";
import { history } from "../App";

export class Form_user extends Component {
  state = {
    addFile: [],
    addFileName: "",
  };

  editUser = () => {
    if (this.state.addFile) {
      let formData = new FormData();

      let obj = {
        fullname: this.fullname.value,
        gender: this.gender.value,
        age: this.age.value,
        email: this.email.value,
        AddressDb: this.AddressDb.value,
      };

      formData.append("data", JSON.stringify(obj));
      formData.append("file", this.state.addFile);

      console.log(formData);
      Axios.patch(`${URL_API}/admin/updateProfile/${this.props.id}`, formData)
        .then(() => {
          alert("berhasil mengubah data");
          history.push("/user");
        })
        .catch((err) => {
          console.log(err);
          // alert("Terjadi Kesalahan");
        });
    }
  };

  onBtnAddFile = (event) => {
    if (event.target.files[0]) {
      this.setState({
        addFileName: event.target.files[0].name,
        addFile: event.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-bold text-center">PROFILE USER</h2>
          </div>
          <div className="card-body p-5 ">
            <div className="row justify-content-center">
              <img
                id="imgpreview"
                src={image_user}
                className="img-thumbnail mb-2"
                alt="image_user"
                style={{ width: "150px" }}
              />
            </div>
            <form>
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Name :
                </label>
                <div className="col-sm-8">
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    className="form-control"
                    ref={(el) => (this.fullname = el)}
                    defaultValue={this.props.fullname}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  gender :
                </label>
                <div className="col-sm-8">
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    className="form-control"
                    ref={(el) => (this.gender = el)}
                    defaultValue={this.props.gender}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Age :
                </label>
                <div className="col-sm-8">
                  <input
                    onChange={this.inputHandler}
                    type="number"
                    className="form-control"
                    ref={(el) => (this.age = el)}
                    defaultValue={this.props.age}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Email :
                </label>
                <div className="col-sm-8">
                  <input
                    onChange={this.inputHandler}
                    type="email"
                    className="form-control"
                    ref={(el) => (this.email = el)}
                    defaultValue={this.props.email}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Address :
                </label>
                <div className="col-sm-8">
                  <textarea
                    onChange={this.inputHandler}
                    type="text"
                    className="form-control"
                    ref={(el) => (this.AddressDb = el)}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label for="exampleFormControlFile1">Upload Profile :</label>
                <div className="col-sm-8 mx-auto">
                  <input
                    onChange={this.onBtnAddFile}
                    type="file"
                    className="form-control-file"
                    id="profile_picture"
                    name="profile_picture"
                  />
                </div>
              </div>
              <Link to="/user" className="btn btn-secondary mt-3 mr-2">
                back
              </Link>
              <button
                onClick={this.editUser}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.authReducer.id);
  return {
    id: state.authReducer.iduser,
    fullname: state.authReducer.fullname,
    email: state.authReducer.email,
    age: state.authReducer.age,
    AddressDb: state.authReducer.AddressDb,
    gender: state.authReducer.gender,
  };
};

export default connect(mapStateToProps)(Form_user);
