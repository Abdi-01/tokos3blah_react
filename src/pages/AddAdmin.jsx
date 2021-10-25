import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { URL_API } from "../helper";
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Table,
} from "reactstrap";
import axios from "axios";

export class AddAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			db_tokos3blah: [],
			selectedID: null,
		};
	}
	componentDidMount() {
		this.getData();
	}

	getData = () => {
		Axios.get(URL_API + "/users/getAdmin")
			.then((res) => {
				console.log(res.data);
				this.setState({ db_tokos3blah: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onBtnAdd = () => {
		// console.log({
		// 	fullname: this.fullname.value,
		// 	email: this.email.value,
		// 	password: this.password.value,
		// 	age:parseInt (this.age.value),
		// 	gender: this.gender.value,
		// 	role:parseInt (this.role.value),
		// 	id_warehouse: this.id_warehouse.value,
		// });
		Axios.post(URL_API + "/users/addAdmin", {
			fullname: this.fullname.value,
			email: this.email.value,
			password: this.password.value,
			age: parseInt(this.age.value),
			gender: this.gender.value,
			role: this.role.value,
			id_warehouse: this.id_warehouse.value,
		})
			.then((res) => {
				this.getData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	printData = () => {
		return this.state.db_tokos3blah.map((item, index) => {
			if (this.state.selectedID !== index) {
				return (
					<tr>
						<td>{index + 1}</td>
						<td>{item.fullname}</td>
						<td>{item.email}</td>
						<td>{item.age}</td>
						<td>{item.gender}</td>
						<td>{item.role}</td>
						<td>{item.nama}</td>
						<td>{item.lokasi}</td>
						<td>
							<Button onClick={() => this.setState({ selectedID: index })}>
								Edit
							</Button>
							<Button
								onClick={() => {
									console.log("delete euy => ", item.fullname);
									Axios.post(URL_API + "/users/delete-admin", {
										iduser: item.iduser,
									})
										.then((res) => {
											this.getData();
										})
										.catch((err) => {
											console.log(err);
										});
								}}
							>
								Delete
							</Button>
						</td>
					</tr>
				);
			} else {
				return (
					<tr>
						<td>{index + 1}</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newnama) => (this.newnama = newnama)}
								defaultValue={item.fullname}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newemail) => (this.newemail = newemail)}
								defaultValue={item.email}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newage) => (this.newage = newage)}
								defaultValue={item.age}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newgender) => (this.newgender = newgender)}
								defaultValue={item.gender}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newrole) => (this.newrole = newrole)}
								defaultValue={item.role}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newwarehouse) => (this.newwarehouse = newwarehouse)}
								defaultValue={item.warehouse}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newlocation) => (this.newlocation = newlocation)}
								defaultValue={item.location}
							/>
						</td>
						<td>
							<Button
								onClick={async () => {
									console.log("kepencet");
									await Axios.patch(URL_API + "/users/edit-Admin", {
										iduser: item.iduser,
										fullname: this.newnama.value,
										email: this.newemail.value,
										//	password: this.newpassword.value,
										age: parseInt(this.newage.value),
										gender: this.newgender.value,
										role: this.newrole.value,
										id_warehouse: this.id_warehouse.value,
									})
										.then((res) => {
											this.setState({ selectedID: null });
											this.getData();
										})
										.catch((err) => {
											console.log(err);
										});
								}}
							>
								yes
							</Button>
							<Button onClick={() => this.setState({ selectedID: null })}>
								No
							</Button>
						</td>
					</tr>
				);
			}
		});
	};

	render() {
		return (
			<div className="row m-auto">
				<Form width="90vw" className="col-md-2">
					<FormGroup>
						<Label for="fullname">Nama</Label>
						<Input
							type="text"
							name="text"
							id="nama"
							innerRef={(fullname) => (this.fullname = fullname)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">email</Label>
						<Input
							type="text"
							name="text"
							id="email"
							innerRef={(email) => (this.email = email)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="text"
							id="password"
							innerRef={(password) => (this.password = password)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="age">age</Label>
						<Input
							type="number"
							name="text"
							id="age"
							innerRef={(age) => (this.age = age)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="gender">gender</Label>
						<Input
							type="text"
							name="text"
							id="gender"
							innerRef={(gender) => (this.gender = gender)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="role">role</Label>
						<Input
							type="select"
							name="text"
							id="role"
							innerRef={(role) => (this.role = role)}
						>
							<option value={"admin"}>admin</option>
							<option value={"super_admin"}>super_admin</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="warehouse">warehouse</Label>
						<Input
							type="text"
							name="text"
							id="warehouse"
							innerRef={(id_warehouse) => (this.id_warehouse = id_warehouse)}
						/>
					</FormGroup>
					{/* <FormGroup>
						<Label for="location">location</Label>
						<Input
							type="text"
							name="text"
							id="location"
							innerRef={(location) => (this.location = location)}
						/>
					</FormGroup> */}
					<Button type="button" onClick={this.onBtnAdd}>
						Submit
					</Button>
				</Form>
				<div className="col=md-10">
					<Table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Nama</th>
								<th>Email</th>
								<th>Age</th>
								<th>Gender</th>
								<th>Role</th>
								<th>Gudang</th>
								<th>Lokasi</th>
							</tr>
						</thead>
						<tbody>{this.printData()}</tbody>
					</Table>
				</div>
			</div>

			/*<div className="p-5">
				<div className="row">
					<div className="col-12">
						<div className="d-flex justify-content-between">
							<h1>Admin Manager</h1>
							<Link
								className="btn btn-success btn-sm my-2 ml-2"
								role="button"
								aria-pressed="true"
								to="/add_admin"
							>
								{" "}
								Tambah Admin
							</Link>
						</div>
						<table className="table mt-4">
							<thead className="thead-light">
								<tr>
									<th>ID</th>
									<th>Nama</th>
									<th>Email</th>
									<th>Age</th>
									<th>Gender</th>
									<th>Role</th>
									<th>Gudang</th>
									<th>Lokasi</th>
									<th colSpan="2">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<button className="btn btn-secondary">Edit</button>
									</td>
									<td>
										<button className="btn btn-danger">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div> */
		);
	}
}

export default AddAdmin;
