import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";

export class Form_user extends Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <h5 className="card-title text-bold">PROFILE USER</h5>
            <img
              src={image_user}
              className="img-thumbnail mb-2"
              alt="image_user"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <button className="btn btn-success">Edit Profile</button>
            <button className="btn btn-info ml-2">Add Profile</button>
          </div>
        </div>
        <form>
          <div className="form-group row">

            <table>
              
            </table>

            <label for="inputPassword" className="col-sm-2 col-form-label">
              Nama :
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="form-group row">
            <label for="jeniskelamin">Jenis Kelamin :</label>
            <div className="col-sm-10">
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Laki-Laki
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Perempuan
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword" className="col-sm-2 col-form-label">
              Usia :
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword" className="col-sm-2 col-form-label">
              Email :
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputPassword" />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword" className="col-sm-2 col-form-label">
              Alamat :
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                id="inputPassword"
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label for="exampleFormControlFile1">Upload Profile :</label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default Form_user;
