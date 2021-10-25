import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export class Form_alamat extends Component {
constructor(props) {
	super(props);
	this.state ={
		redirect:false,
	}
}

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
									<Button className="btn btn-primary mt-2">Submit</Button>
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
									<Link href="#" class="btn btn-primary">
										Button
									</Link>
								</div>
							</div>

							<div class="card w-75 bg-light mb-3">
								<div class="card-body">
									<h5 class="card-title">Alamat 2</h5>
									<p class="card-text">
										With supporting text below as a natural lead-in to
										additional content.
									</p>
									<Link href="#" class="btn btn-primary">
										Button
									</Link>
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
