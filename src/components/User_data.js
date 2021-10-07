import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";

export class User_data extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={image_user} alt="image_user" className="img-fluid" />
            </div>
            <div className="col-md-8">
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
                        <button className="btn btn-secondary btn-sm mr-2">
                          Detail
                        </button>
                        <button className="btn btn-success btn-sm mr-2">
                          Edit
                        </button>
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
