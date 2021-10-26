import axios from "axios";
import React, { Component } from "react";
import { URL_API } from "../../helper";
import { history } from "../../App";

export class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passRightTokenRight: false,
			passWrongTokenRight: false,
			passRightTokenWrong: false,
		};
	}

	onBtnChangePass = () => {
		this.setState({
			passRightTokenRight: false,
			passWrongTokenRight: false,
			passRightTokenWrong: false,
		});
		if (this.inPassword.value === this.conPassword.value) {
			axios
				.post(URL_API + `/users/change-pass`, {
					token: this.props.match.params.token,
					password: this.inPassword.value,
				})
				.then((res) => {
					if (res.status === 200) {
						this.setState({ passRightTokenRight: true });
						setInterval(() => {
							history.push("/login");
						}, 3000);
					} else {
						this.setState({ passRightTokenWrong: true });
					}
				});
		} else {
			this.setState({ passWrongTokenRight: true });
		}
	};

	componentDidMount() {
		console.log(this.props.match.params.token);
	}

	render() {
		return (
			<div className="container" style={{ marginTop: "70px" }}>
				<form>
					<div className="form-group mb-5">
						<label for="exampleInputEmail1">
							Silakan masukan password baru
						</label>
						{this.state.passRightTokenRight && (
							<div className="alert alert-success" role="alert">
								Ganti password berhasil
							</div>
						)}
						{this.state.passWrongTokenRight && (
							<div className="alert alert-danger" role="alert">
								Password yang anda masukan tidak sama, mohon masukan password
								dengan benar
							</div>
						)}
						{this.state.passRightTokenWrong && (
							<div className="alert alert-danger" role="alert">
								Maaf, user tidak ditemukan
							</div>
						)}
						<input
							type="password"
							ref={(el) => (this.inPassword = el)}
							className="form-control"
							aria-describedby="emailHelp"
							placeholder="Enter Password"
						/>
					</div>
					<div className="form-group">
						<label for="exampleInputEmail1">
							Konfirmasi password baru anda
						</label>
						<input
							type="password"
							ref={(el) => (this.conPassword = el)}
							className="form-control"
							aria-describedby="emailHelp"
							placeholder="Confirm Password"
						/>
					</div>
				</form>
				<div className="text-center">
					<button
						onClick={this.onBtnChangePass}
						type="button"
						className="btn btn-success btn-lg mt-5"
						color="green"
					>
						Reset Password
					</button>
				</div>
			</div>
		);
	}
}

export default ChangePassword;
