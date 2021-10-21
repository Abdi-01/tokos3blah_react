import React, { Component } from "react";
import { history } from "../App";
import { Link } from "react-router-dom";

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
				<div className="button">
					<Link className="btn btn-primary btn-lg active" role="button" aria-pressed="true" to="/add_admin"> admin</Link>
					<Link className="btn btn-primary btn-lg active" role="button" aria-pressed="true" to="/add_warehouse"> gudang</Link>
				</div>
			</div>
		);
	}
}

export default SuperAdmin;
