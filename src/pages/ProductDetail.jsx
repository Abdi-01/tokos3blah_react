import React, { Component } from "react";
import Axios from "axios";
import { URL_API } from "../helper";

export default class ProductDetail extends Component {
  state = {
    productData: {},
    productNotFound: false,
    quantity: 1,
  };

  fetchProductData = () => {
    Axios.get(`${URL_API}/home/detail/${this.props.match.params.productId}`)
      .then((result) => {
        if (result.data.length) {
          this.setState({ productData: result.data[0] });
        } else {
          this.setState({ productNotFound: true });
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  qtyBtnHandler = (action) => {
    if (action === "increment") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (action === "decrement" && this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  componentDidMount() {
    this.fetchProductData();
  }

  render() {
    return (
      <div className="container ">
        <div className="card mt-5">
          <div className="card-header">
            <nav>
              <ol class="breadcrumb bg-transparent p-0 my-auto">
                <li class="breadcrumb-item">
                  <a href="#/">Product</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Product Detail
                </li>
              </ol>
            </nav>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="card-img rounded">
                  <img
                    src={URL_API + this.state.productData.img_product}
                    style={{ height: "300px" }}
                  />
                </div>
              </div>

              <div className="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">
                    {this.state.productData.productName}
                  </h5>
                  <p class="card-text">
                    {" "}
                    Rp.
                    {this.state.productData.price}
                  </p>
                  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <button
                          onClick={() => this.qtyBtnHandler("increment")}
                          className="btn btn-dark"
                        >
                          +
                        </button>
                      </li>
                      <li>
                        <p className="text-muted mx-4 my-2">
                          {this.state.quantity}
                        </p>
                      </li>
                      <li className="page-item">
                        <button
                          onClick={() => this.qtyBtnHandler("decrement")}
                          className="btn btn-dark"
                        >
                          -
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <button className="btn btn-success mt-3">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
