import axios from "axios";
import React, { Component } from "react";

export class ForgotPassword extends Component {
	  
  render() {
		return (
			<div class="container" style={{marginTop : "10px"}}>
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">
							Silakan masukan email anda untuk verifikasi
						</label>
						<input
							type="email"
							class="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
					</div>
				</form>
        <button type="button" class="btn btn-success btn-lg" color="green">Reset Password</button>
			</div>
		);
	}
}

export default ForgotPassword;
