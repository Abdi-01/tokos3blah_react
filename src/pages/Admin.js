import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import { history } from "../App";
import Axios from "axios";
import { URL_API } from "../helper";
// import CustomSelect from "../components/CustomSelect";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      productList: [],
      page: 1,
      maxPage: 0,
      itemPerPage: 5,
      productSelector: [],

      addFileName: "",
      addFile: [],

      addProductName: "",
      addPrice: 0,
      addCategory: "",
      addImgproduct: "",
      AddQuantity: "",
      selectedOption: null,

      productRadio: "",

      editId: null,

      // editProductName: "",
      // editPrice: 0,
      // editCategory: "",
      // editImgproduct: "",
      // editWarehouse: "",
      editQuantity: 0,
    };
  }

  fetchProducts = () => {
    console.log(this.props.id);
    Axios.get(`${URL_API}/products/get/${sessionStorage.getItem("id")}`)

      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch((err) => {
        console.log(err);
        // alert("Terjadi Kesalahan di Server");
      });
  };

  selectProducts = () => {
    Axios.get(`${URL_API}/select/get`)
      .then((result) => {
        console.log("cek select", result.data);
        let generate = result.data.map((val, idx) => {
          return { ...val, value: val.id_product, label: val.productName };
        });
        this.setState({
          productSelector: generate,
        });
      })
      .catch((err) => {
        console.log(err);
        // alert("Terjadi Kesalahan di Server");
      });
  };

  editToggle = (editData) => {
    this.setState({
      editId: editData,
      // editProductName: editData.productName,
      // editPrice: parseInt(editData.price),
      // editCategory: editData.category,
      // editImgproduct: editData.img_product,
      // editWarehouse: editData.id_warehouse,
      // editQuantity: editData.Quantity,
    });
  };

  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    Axios.patch(`${URL_API}/products/edit-product/${this.state.editId}`, {
      Quantity: parseInt(this.Quantity.value),

      // Quantity: parseInt(this.state.editQuantity),
    })
      .then(() => {
        this.fetchProducts();
        this.cancelEdit();
      })
      .catch((err) => {
        console.log(err);
        // alert("Terjadi Kesalahan");
      });
  };

  deleteBtnHandler = (deleteId) => {
    console.log(deleteId);
    const confirmDelete = window.confirm("Yakin Delete Barang");
    if (confirmDelete) {
      Axios.delete(`${URL_API}/products/delete-product/${deleteId}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch((err) => {
          console.log(err);
          // alert("Terjadi Kesalahan");
        });
    } else alert("Cancel delete barang");
  };

  renderProduct = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    const currentData = this.state.productList.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val, index) => {
      if (index !== this.state.editId) {
        return (
          <tr>
            <td scope="col">{index + 1}</td>
            <td scope="col">{val.productName}</td>
            <td scope="col">{val.price}</td>
            <td scope="col">{val.category}</td>
            <td scope="col">
              <img
                src={URL_API + val.img_product}
                className="img-thumbnail mb-2"
                alt="image_user"
                style={{ width: "100px" }}
              />
            </td>
            <td scope="col">{val.Kode_Gudang}</td>
            <td scope="col">{val.Quantity}</td>
            <td scope="col">
              <button
                onClick={() => this.editToggle(index)}
                className="btn btn-success mr-2"
                type="submit"
              >
                Edit
              </button>
              <button
                onClick={() => this.deleteBtnHandler(val.id)}
                className="btn btn-danger"
                type="submit"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td scope="col">{val.id_product}</td>
            <td scope="col">{val.productName}</td>
            <td scope="col">{val.price}</td>
            <td scope="col">{val.category}</td>
            <td scope="col">
              <img
                src={URL_API + val.img_product}
                className="img-thumbnail mb-2"
                alt="image_user"
                style={{ width: "100px" }}
              />
            </td>
            <td scope="col">{val.Kode_Gudang}</td>
            <td>
              <input
                onChange={this.inputHandler}
                class="form-control"
                type="number"
                name="editQuantiy"
                // defaultValue={this.state.editQuantity}
                innerRef={(Quantity) => (this.Quantity = Quantity)}
                defaultValue={val.Quantity}
              />
            </td>
            <td scope="col">
              <button
                onClick={this.saveBtnHandler}
                className="btn btn-success mr-2"
                type="submit"
              >
                Save
              </button>
              <button onClick={this.cancelEdit} className="btn btn-danger">
                cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  addNewProduct = () => {
    if (this.state.productRadio === "option1") {
      if (this.state.addFile) {
        console.log(this.state.addFile);
        let formData = new FormData();

        let obj = {
          productName: this.state.addProductName,
          price: parseInt(this.state.addPrice),
          category: this.state.addCategory,
          // id_warehouse: this.state.addWarehouse,
          // img_product: this.state.addImgproduct,
        };

        formData.append("data", JSON.stringify(obj));
        formData.append("file", this.state.addFile);
        Axios.post(`${URL_API}/products/add-product`, formData)
          .then((res) => {
            console.log(res);
            Axios.post(`${URL_API}/products/add-product-warehouse`, {
              id_product: res.data.id,
              id_warehouse: this.props.id_warehouse,
              Quantity: this.state.AddQuantity,
            }).then(() => {
              this.fetchProducts();
              this.setState({
                addProductName: "",
                addPrice: 0,
                addCategory: "",
                addImgproduct: "",
              });
            });
          })
          .catch((err) => {
            console.log(err);
            // alert("Terjadi Kesalahan di Server");
          });
      }
    } else {
      Axios.post(`${URL_API}/products/add-product-warehouse`, {
        id_product: this.state.selectedOption.id_product,
        id_warehouse: this.props.id_warehouse,
        Quantity: this.state.AddQuantity,
      }).then(() => {
        this.fetchProducts();
        this.setState({
          addProductName: "",
          addPrice: 0,
          addCategory: "",
          addImgproduct: "",
        });
      });
    }
  };

  onBtnAddFile = (event) => {
    if (event.target.files[0]) {
      this.setState({
        addFileName: event.target.files[0].name,
        addFile: event.target.files[0],
      });
    }
  };

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  inputHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      history.push("/");
    }

    this.fetchProducts();
    // this.selectProducts();
  }

  render() {
    console.log(this.state.productList);
    return (
      <div className="container">
        <h1 className="text-center mt-3 mb-3">Product List</h1>
        <button
          type="button"
          className="btn btn-primary mb-3"
          data-toggle="modal"
          data-target="#productModal"
        >
          Add Product
        </button>
        <div className="row">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr className="className=" d-flex align-items-center>
                <th scope="col">No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Warehouse</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{this.renderProduct()}</tbody>
          </table>

          <div className="container">
            <div className="row ">
              <div className="col ">
                <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        disabled={this.state.page === 1}
                        onClick={this.prevPageHandler}
                        className="btn btn-dark"
                      >
                        &laquo;
                      </button>
                    </li>
                    <li>
                      <p className="text-muted mx-2 my-2">{this.state.page}</p>
                    </li>
                    <p className="text-muted mx-2 my-2">/</p>
                    <li>
                      <p className="text-muted mx-2 my-2">
                        {this.state.maxPage}
                      </p>
                    </li>
                    <li className="page-item">
                      <button
                        disabled={this.state.page === this.state.maxPage}
                        onClick={this.nextPageHandler}
                        className="btn btn-dark"
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="productModal"
          tabindex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="productModalLabel">
                  Form Input Product
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <div class="form-check">
                          <input
                            onChange={this.inputHandler}
                            class="form-check-input"
                            type="radio"
                            name="productRadio"
                            id="newProduct"
                            value="option1"
                          />
                          <label class="form-check-label" for="exampleRadios1">
                            Add New Product
                          </label>
                        </div>
                      </div>

                      <div className="col-6">
                        <div class="form-check">
                          <input
                            onChange={this.inputHandler}
                            class="form-check-input"
                            type="radio"
                            name="productRadio"
                            id="oldProduct"
                            value="option2"
                          />
                          <label class="form-check-label" for="exampleRadios2">
                            Exist product
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.state.productRadio === "option1" && (
                    <>
                      <div>
                        <h2>Add New Product</h2>
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label">
                            Product Name:
                          </label>
                          <input
                            onChange={this.inputHandler}
                            type="text"
                            class="form-control"
                            id="productName"
                            name="addProductName"
                            value={this.state.productList.productName}
                          />
                        </div>
                        <div class="form-group">
                          <label for="message-text" class="col-form-label">
                            Price:
                          </label>
                          <input
                            onChange={this.inputHandler}
                            type="number"
                            class="form-control"
                            id="price"
                            name="addPrice"
                            value={this.state.productList.price}
                          />
                        </div>
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label">
                            Category:
                          </label>
                          <input
                            onChange={this.inputHandler}
                            type="text"
                            class="form-control"
                            id="category"
                            name="addCategory"
                            value={this.state.productList.category}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlFile1">
                            Upload Image :
                          </label>
                          <input
                            onChange={this.onBtnAddFile}
                            type="file"
                            class="form-control-file"
                            id="img"
                            name="addImgproduct"
                          />
                        </div>

                        <div class="form-group">
                          <label for="exampleFormControlFile1">Qty :</label>
                          <input
                            onChange={this.inputHandler}
                            type="number"
                            class="form-control"
                            id="AddQuantity"
                            name="AddQuantity"
                            defaultValue="0"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {this.state.productRadio === "option2" && (
                    <div>
                      <h2>Exist Product</h2>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Search Product Name:
                        </label>

                        <Select
                          options={this.state.productSelector}
                          value={this.state.selectedOption}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlFile1">Qty :</label>
                        <input
                          onChange={this.inputHandler}
                          type="number"
                          class="form-control"
                          id="AddQuantity"
                          name="AddQuantity"
                          defaultValue="0"
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>

                <button
                  onClick={this.addNewProduct}
                  type="submit"
                  class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.authReducer);
  return {
    id: state.authReducer.iduser,
    id_warehouse: state.authReducer.id_warehouse,
    // fullname: state.authReducer.fullname,
    // role: state.authReducer.role,
  };
};

export default connect(mapStateToProps)(Admin);
