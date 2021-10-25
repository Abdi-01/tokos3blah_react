import React, { Component } from "react";

export class Form_alamat extends Component {
  render() {
    return (
      <div className="container ">
        <div className="card ">
          <div className="card-header bg-dark">
            <h3 className="card-title text-center text-white text-bold">
              Isi Alamat
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label for="inputAlamat" className="col-sm-2 col-form-label">
                  <h4>Alamat :</h4>
                </label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    id="inputAlamat"
                  />
                  <button className="btn btn-primary mt-2">Submit</button>
                </div>
              </div>

              <h2 className="card-title text-bold">Alamat Ku</h2>

              <div class="card w-75 bg-light mb-3">
                <div class="card-body">
                  <h5 class="card-title">Alamat 1</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Button
                  </a>
                </div>
              </div>

              <div class="card w-75 bg-light mb-3">
                <div class="card-body">
                  <h5 class="card-title">Alamat 2</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Button
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form_alamat;
