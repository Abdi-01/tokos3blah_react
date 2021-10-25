import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";
import { URL_API } from "../helper";

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    Axios.get(`${URL_API}/select/get`)
      .then((result) => {
        console.log("cek select", result.data);
        let generate = result.data.map((val, idx) => {
          return { ...val, value: val.id_product, label: val.productName };
        });
        this.setState({
          productList: generate,
        });
      })
      .catch((err) => {
        console.log(err);
        // alert("Terjadi Kesalahan di Server");
      });
  };

  render() {
    return <Select options={this.state.productList} />;
  }
}
export default CustomSelect;
