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

		
	

			<div className="container flexbox">
				<div className="row row-cols-10">
					<h1>Hello Admin {sessionStorage.getItem("fullname")}</h1>
				</div>

				
				</div>
			
		);
	}
}

export default SuperAdmin;
