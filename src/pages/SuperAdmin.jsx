import React, { Component } from "react";
// import image_user from "../asset/image/logo.jpeg";
import { history } from "../App";

export class SuperAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem("role") !== "super_admin") {
			history.push("/");
		}
	}

	render() {
		return (
			<div className="container">
			 <h1>Tempat SuperAdmin Kumpul</h1>
			</div>
		);
	}
}

export default SuperAdmin;
