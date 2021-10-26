import React, { Component } from "react";
import axios from "axios";
import { URL_API } from "../../helper";

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alertShow: false,
			errorShow: false,
		};
	}
	onBtForgot = () => {
		this.setState({ alertShow: false, errorShow: false });
		axios
			.post(URL_API + `/users/forgot-pass`, {
				email: this.inEmail.value,
			})
			.then((res) => {
				if (res.status === 200) {
					this.setState({ alertShow: true });
				} else {
					this.setState({ errorShow: true });
				}
			})
			.catch((err) => {
				console.log(err);
				this.setState({ errorShow: true });
			});
	};

	render() {
		return (
			<div className="container" style={{ marginTop: "10px" }}>
				<form>
					<div className="form-group">
						<label for="exampleInputEmail1">
							Silakan masukan email anda untuk verifikasi
						</label>
						{this.state.alertShow && (
							<div class="alert alert-success" role="alert">
								Lupa password berhasil
							</div>
						)}
						{this.state.errorShow && (
							<div class="alert alert-danger" role="alert">
								Email yang anda masukan salah
							</div>
						)}
						<input
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							ref={(el) => (this.inEmail = el)}
							placeholder="Email"
							type="email"
						/>
					</div>
				</form>
				<button
					onClick={this.onBtForgot}
					type="button"
					className="btn btn-success btn-lg"
					color="green"
				>
					Reset Password
				</button>
			</div>
		);
	}
}

export default ForgotPassword;
