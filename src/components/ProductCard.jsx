import React, { Component } from "react";
import { Link } from "react-router-dom";
import { URL_API } from "../helper";

export default class ProductCard extends Component {
  render() {
    return (

      // <div className="container">
      //   <div className="row">
      //     <div className="col bg-success"></div>
      //     <div className="col bg"></div>
      //   </div>
        
      // </div>
      <div className="col-md-3">
        <div className="card mb-3">
          <img
            src={URL_API + this.props.productData.img_product}
            className="card-img-top img-f;uid"
            alt="..."
            style={{ width: "100%", height: "300px" }}
          />
          <div className="card-body">
            <Link
              to={`/ProductDetail/${this.props.productData.id_product}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h5 className="card-title">
                {this.props.productData.productName}
              </h5>
            </Link>
            <p className="card-text">Rp. {this.props.productData.price}</p>
            <a href="#" className="btn btn-primary">
              Add To Cart
            </a>
          </div>
        </div>
      </div>
    );
  }
}
