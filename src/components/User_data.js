import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import Axios from "axios";
import { URL_API } from "../helper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class User_data extends Component {
  state = {
    userList: {},
  };

  fetchUser = async () => {
    await Axios.get(`${URL_API}/admin/getadmin/${sessionStorage.getItem("id")}`)
      .then((result) => {
        console.log(result);
        this.setState({ userList: result.data[0] });
      })
      .catch((err) => {
        console.log(err);
        // alert("Terjadi Kesalahan di Server");
      });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src={image_user} alt="image_user" className="img-fluid" />
            </div>
            <div className="col-md-9">
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
                      <td scope="col">{this.state.userList.fullname}</td>
                      <td scope="col">{this.props.gender}</td>
                      <td scope="col">{this.props.email}</td>
                      <td scope="col">{this.props.AddressDb}</td>
                      <td scope="col">{this.props.age}</td>

                      <td colspan="2">
                        <Link
                          to={`/form_user/${this.props.id}`}
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

export default connect(mapStateToProps)(User_data);
