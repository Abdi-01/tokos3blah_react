import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import { Link } from "react-router-dom";
import Axios from "axios";
import { URL_API } from "../helper";

export class Form_user extends Component {
  state = {
    name: "",
    gender: "",
    age: "",
    email: "",
    address: "",
    profile_picture: "",
  };

  editUser = () => {
    if (this.state.addFile) {
      let formData = new FormData();

      let obj = {
        name: this.state.name,
        gender: this.state.gender,
        age: this.state.age,
        email: this.state.email,
        address: this.state.address,
      };

      formData.append("data", JSON.stringify(obj));
      formData.append("file", this.state.addFile);
      Axios.patch(`${URL_API}/user/add-user/${this.state.iduser}`, formData)
        .then(() => {
          alert("berhasil menambahkan data");
        })
        .catch(() => {
          alert("Terjadi Kesalahan");
        });
    }

  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
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
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="jeniskelamin">Gender :</label>
                <div className="col-sm-8 mx-auto">
                  <div className="form-check form-check-inline">
                    <input
                      onChange={this.inputHandler}
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="gender"
                      name="male"
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      onChange={this.inputHandler}
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="gender"
                      name="Female"
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Female
                    </label>
                  </div>
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
                    id="age"
                    name="age"
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
                    id="email"
                    name="email"
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
                    id="address"
                    name="address"
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

export default Form_user;
