import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";

export class Admin extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-3 mb-3">Product List</h1>
        <button className="btn btn-info mb-2">Add Product</button>
        <div className="row">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr className="className=" d-flex align-items-center>
                <th scope="col">No</th>
                <th scope="col">Product className</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col">1</td>
                <td scope="col">Kameja</td>
                <td scope="col">140000</td>
                <td scope="col">Baju</td>
                <td scope="col">
                  <img
                    src={image_user}
                    className="img-thumbnail mb-2"
                    alt="image_user"
                    style={{ width: "100px" }}
                  />
                </td>
                <td scope="col">
                  <button className="btn btn-success mr-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td scope="col">2</td>
                <td scope="col">kaos</td>
                <td scope="col">230000</td>
                <td scope="col">Baju</td>
                <td scope="col">
                  <img
                    src={image_user}
                    className="img-thumbnail mb-2"
                    alt="image_user"
                    style={{ width: "100px" }}
                  />
                </td>
                <td scope="col">
                  <button className="btn btn-success mr-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td scope="col">2</td>
                <td scope="col">Levis</td>
                <td scope="col">170000</td>
                <td scope="col">Celana</td>
                <td scope="col">
                  <img
                    src={image_user}
                    className="img-thumbnail mb-2"
                    alt="image_user"
                    style={{ width: "100px" }}
                  />
                </td>
                <td scope="col">
                  <button className="btn btn-success mr-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Admin;
