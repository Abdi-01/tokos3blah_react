import React, { Component } from "react";
import image_user from "../asset/image/logo.jpeg";
import { history } from "../App";
import Axios from "axios";
import { URL_API } from "../helper";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      productList: [],
      warehouseList: [],
      page: 1,
      maxPage: 0,
      itemPerPage: 5,

      addFileName: "",
      addFile: [],

      addProductName: "",
      addPrice: 0,
      addCategory: "",
      addImgproduct: "",
      addWarehouse: "",

      editId: 0,

      editProductName: "",
      editPrice: 0,
      editCategory: "",
      editImgproduct: "",
      editWarehouse: "",
    };
  }

  fetchProducts = () => {
    Axios.get(`${URL_API}/products/get`)
      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
        });
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di Server");
      });
  };



  editToggle = (editData) => {
    this.setState({
      editId: editData.id_product,
      editProductName: editData.productName,
      editPrice: parseInt(editData.price),
      editCategory: editData.category,
      editImgproduct: editData.img_product,
      editWarehouse: editData.id_warehouse,
    });
  };

  cancelEdit = () => {
    this.setState({ editId: 0 });
  };

  saveBtnHandler = () => {
    if (this.state.addFile) {
      console.log(this.state.addFile);
      let formData = new FormData();

      let obj = {
        productName: this.state.editProductName,
        price: parseInt(this.state.editPrice),
        category: this.state.editCategory,
        img_product: this.state.editImgproduct,
        id_warehouse: this.state.editWarehouse,
      };

      console.log(obj);
      formData.append("data", JSON.stringify(obj));
      formData.append("file", this.state.addFile);
      Axios.patch(
        `${URL_API}/products/edit-product/${this.state.editId}`,
        formData
      )
        .then(() => {
          this.fetchProducts();
          this.cancelEdit();
        })
        .catch(() => {
          alert("Terjadi Kesalahan");
        });
    }
  };

  deleteBtnHandler = (deleteId) => {
    console.log(deleteId);
    const confirmDelete = window.confirm("Yakin Delete Barang");
    if (confirmDelete) {
      Axios.delete(`${URL_API}/products/delete-product/${deleteId}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch(() => {
          alert("Terjadi Kesalahan");
        });
    } else alert("Cancel delete barang");
  };

  renderProduct = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    const currentData = this.state.productList.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      if (val.id_product === this.state.editId) {
        return (
          <tr>
            <td scope="col">{val.id_product}</td>
            <td scope="col">
              <input
                value={this.state.editProductName}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editProductName"
              />
            </td>
            <td scope="col">
              <input
                value={this.state.editPrice}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editPrice"
              />
            </td>
            <td scope="col">
              <input
                value={this.state.editCategory}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editCategory"
              />
            </td>

            <td scope="col">
              <input
                value={this.state.editImgproduct}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editImgproduct"
              />
            </td>
            <td>
              <select
                onChange={this.inputHandler}
                name="editWarehouse"
                className="form-control"
                value={this.state.editWarehouse}
              >
                {this.state.warehouseList.map((val) => {
                  if (val.id_warehouse) {
                    return <option value={val.id_warehouse}>{val.Nama}</option>;
                  }
                })}
              </select>
            </td>

            <td scope="col">
              <input
                value={this.state.editImgproduct}
                onChange={this.inputHandler}
                type="text"
                className="form-control"
                name="editQuantity"
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
          <td scope="col">{val.Quantity}</td>
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

  addNewProduct = () => {
    if (this.state.addFile) {
      console.log(this.state.addFile);
      let formData = new FormData();

      let obj = {
        productName: this.state.addProductName,
        price: parseInt(this.state.addPrice),
        category: this.state.addCategory,
        id_warehouse: this.state.addWarehouse,
        // img_product: this.state.addImgproduct,
      };

      formData.append("data", JSON.stringify(obj));
      formData.append("file", this.state.addFile);
      Axios.post(`${URL_API}/products/add-product`, formData)
        .then(() => {
          this.fetchProducts();
          this.setState({
            addProductName: "",
            addPrice: 0,
            addCategory: "",
            addImgproduct: "",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Terjadi Kesalahan di Server");
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

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "admin") {
      history.push("/");
    }
    this.fetchProducts();
  }

  render() {
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
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlFile1">Input Image :</label>
                    <input
                      onChange={this.onBtnAddFile}
                      type="file"
                      class="form-control-file"
                      id="img"
                      name="addImgproduct"
                    />
                  </div>
                  {/* <div class="form-group">
						<label for="recipient-name" class="col-form-label">
						  Warehouse:
						</label>
						<select
						  onChange={this.inputHandler}
						  name="addWarehouse"
						  className="form-control"
						>
						  {this.state.warehouseList.map((val) => {
							if (val.id_warehouse) {
							  return (
								<option value={val.id_warehouse}>
								  {val.Kode_Gudang}
								</option>
							  );
							}
						  })}
						</select>
					  </div> */}
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

export default Admin;
