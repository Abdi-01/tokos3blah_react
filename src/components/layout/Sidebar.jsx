import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";

export class Sidebar extends React.Component {
	render() {
		return (
			<div className="row" style={{ height: "93vh" }}>
				<div className="col-3" style={{ position: "sticky" }}>
					<ul className="list-group">
            <li className="list-group-item"><Link to="./super_admin"> Super Admin</Link></li>
            <li className="list-group-item"><Link to="./add_admin">Edit Admin</Link></li>
            <li className="list-group-item"><Link to="/add_warehouse">Edit Warehouse</Link></li>
          </ul>
				</div>
				<div className="col-9">{this.props.children}</div>
			</div>
		);
	}
}

export default Sidebar;
