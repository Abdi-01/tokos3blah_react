import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import Axios from "axios";
import { URL_API } from "../helper";
import { Link } from "react-router-dom";

export class User_data extends Component {
  state = {
    userList: [],
  };

  fetchProducts = () => {
    Axios.get(`${URL_API}/user/get`)
      .then((result) => {
        this.setState({ userList: result.data });
      })
      .catch((err) => {
        console.log(err)
        // alert("Terjadi Kesalahan di Server");
      });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  renderProduct = () => {
    return this.state.userList.map((val) => {
      return (
        <tr>
          <td scope="col">{val.iduser}</td>
          <td scope="col">{val.fullname}</td>
          <td scope="col">{val.email}</td>
          <td scope="col">{val.age}</td>
          <td scope="col">{val.AddressDb}</td>
          <td scope="col">{val.password}</td>
          
          <td scope="col">
            <button
              onClick={() => this.editToggle(val)}
              className="btn btn-success mr-2"
              type="submit"
            >
              Edit
            </button>
            <button
              onClick={() => this.deleteBtnHandler(val.id_product)}
              className="btn btn-danger"
              type="submit"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              {/* {this.state.photos.map((photo) => (
                <img src={`${API_URL}/upload/${photo.filename}`} />
              ))} */}
              <img src={image_user} alt="image_user" className="img-fluid" />
              {/* <div className="d-flex justify-content-end pt-2">
                <input
                  type="file"
                  className="form-control-file"
                  id="profile_picture"
                  name="file"
                  onChange={() => this.uploadHandler}
                />
              </div> */}
            </div>
            <div className="col-md-9">
              y
              <div className="card-body">
                <h5 className="card-title">Profile User</h5>

                <table className="table table-hover table-responsive">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Fullname</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col">Age</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mark</td>
                      <td>Pria</td>
                      <td>admin@gmail.com</td>
                      <td>Kp. Pajagan</td>
                      <td>17</td>

                      <td colspan="2">
                        <Link
                          to="/form_user"
                          className="btn btn-success btn-sm mr-2"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User_data;
