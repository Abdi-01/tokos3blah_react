import React, { Component } from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { URL_API } from "../helper";

export class Home extends Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 8,
    searchCategory: "",
    searchProductName: "",
    sortBy: "",
  };

  fetchProducts = () => {
    Axios.get(`${URL_API}/home/get`)
      .then((result) => {
        this.setState({
          productList: result.data,
          maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
          filteredProductList: result.data,
        });
      })
      .catch((err) => {
        // alert("Terjadi kesalahan di server");
        console.log(err)
      });
  };

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rawData = [...this.state.filteredProductList];
    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }

      if (a.productName > b.productName) {
        return +1;
      }

      return 0;
    };
    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort(compareString);
        break;
      case "za":
        rawData.sort((a, b) => compareString(b, a));
        break;
      default:
        rawData = [...this.state.filteredProductList];
    }
    const currentData = rawData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((val) => {
      return <ProductCard productData={val} />;
    });
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
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  searchBtnHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return (
        val.productName
          .toLowerCase()
          .includes(this.state.searchProductName.toLowerCase()) &&
        val.category
          .toLowerCase()
          .includes(this.state.searchCategory.toLowerCase())
      );
    });

    this.setState({
      filteredProductList,
      maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
      page: 1,
    });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    return (
      <div className="container-fluid p-0 m-0">
        <div className="jumbotron text-center bg-dark text-white">
          <h1 className="display-4">Hello, world!</h1>

          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </div>

        <div className="container">
          <div className="row px-3">
            <div className="card mb-3 " style={{ width: "100%" }}>
              <div className="card-header text-center bg-dark text-white">
                <h2>Search</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="searchProductName">Product Name</label>
                      <input
                        onChange={this.inputHandler}
                        name="searchProductName"
                        type="text"
                        className="form-control mb-3"
                      />
                    </div>
                    <div className="form-group">
                      <label for="inputState">Product Kategory</label>
                      <select
                        onChange={this.inputHandler}
                        name="searchCategory"
                        className="form-control"
                      >
                        <option value="">All Items</option>
                        <option value="baju">Baju</option>
                        <option value="rok">Rok</option>
                        <option value="kameja">Kameja</option>
                      </select>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={this.searchBtnHandler}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label for="inputState">Product Price</label>
                      <select
                        onChange={this.inputHandler}
                        name="sortBy"
                        className="form-control"
                      >
                        <option value="">Default</option>
                        <option value="lowPrice">Lowest Price</option>
                        <option value="highPrice">Highest Price</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row ">{this.renderProducts()}</div>

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

        <footer
          className="text-center text-white bg-dark"
          style={{ backgroundColor: "#0a4275" }}
        >
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 202i{" "}
            <a className="text-white" href="https://TokoS3blah.com/">
              TokoS3blah.com
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
