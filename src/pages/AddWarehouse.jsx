import React, { Component } from "react";
import Axios from "axios";
import { URL_API } from "../helper";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Table,
} from "reactstrap";
import { history } from "../App";

export class AddWarehouse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			db_Warehouse: [],
			selectedID: null,
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem("role") !== "super_admin") {
			history.push("/");
		}
	}

	componentDidMount() {
		this.getWarehouse();
	}

	getWarehouse = () => {
		Axios.get(URL_API + "/warehouse/getWarehouse")
			.then((res) => {
				this.setState({ db_Warehouse: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onBtnAdd = () => {
		Axios.post(URL_API + "/warehouse/addWarehouse", {
			Kode_Gudang: this.Kode_Gudang.value,
			Lokasi: this.lokasi.value,
			Status: this.status.value,
		})
			.then((res) => {
				this.getWarehouse();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	printData = () => {
		return this.state.db_Warehouse.map((item, index) => {
			if (this.state.selectedID !== index) {
				return (
					<tr>
						<td>{index + 1}</td>
						<td>{item.Kode_Gudang}</td>
						<td>{item.Lokasi}</td>
						<td>{item.Status}</td>
						<td>
							<Button onClick={() => this.setState({ selectedID: index })}>
								edit
							</Button>
							<Button
								onClick={() => {
									console.log("delete Gudang => ", item.Kode_Gudang);
									Axios.post(URL_API + "/warehouse/delete-warehouse", {
										id_warehouse: item.id_warehouse,
									})
										.then((res) => {
											this.getWarehouse();
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
								innerRef={(newKode_Gudang) =>
									(this.newKode_Gudang = newKode_Gudang)
								}
								defaultValue={item.Kode_Gudang}
							/>
						</td>
						<td>
							<Input
								type="text"
								name="text"
								innerRef={(newLokasi) => (this.newLokasi = newLokasi)}
								defaultValue={item.Lokasi}
							/>
						</td>
						<td>
							<Input
								type="option"
								name="text"
								innerRef={(newStatus) => (this.newStatus = newStatus)}
								defaultValue={item.Status}
							>
								<option value={"active"}>Active</option>
								<option value={"Inactive"}>Inactive</option>
							</Input>
						</td>
						<td>
							<Button
								onClick={async () => {
									console.log("kepencet edit");
									await Axios.patch(URL_API + "/warehouse/editwarehouse", {
										id_warehouse: item.id_warehouse,
										Kode_Gudang: this.newKode_Gudang.value,
										Lokasi: this.newLokasi.value,
										Status: this.newStatus.value,
									})
										.then((res) => {
											this.setState({ selectedID: null });
											this.getWarehouse();
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
							{/* {this.state.selectedID === null ? (
								// <>
								// 	<Button onClick={() => this.setState({ selectedID: index })}>
								// 		Edit
								// 	</Button>
								// 	<Button>Delete</Button>
								// </>
							) : (
								<>
									<Button onClick={() => this.setState({ selectedID: null })}>
										No
									</Button>
									<Button>Yes</Button>
								</>
							)} */}
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
					<h4>Tambah Gudang</h4>
					<FormGroup>
						<Label for="Kode_Gudang">Kode Gudang</Label>
						<Input
							type="text"
							name="text"
							id="nama"
							innerRef={(Kode_Gudang) => (this.Kode_Gudang = Kode_Gudang)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Lokasi">Lokasi</Label>
						<Input
							type="text"
							name="text"
							id="warehouse"
							innerRef={(lokasi) => (this.lokasi = lokasi)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="status">Status</Label>
						<Input
							type="text"
							name="text"
							id="warehouse"
							innerRef={(status) => (this.status = status)}
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
								<th>Kode Gudang</th>
								<th>Lokasi</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>{this.printData()}</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

export default AddWarehouse;
