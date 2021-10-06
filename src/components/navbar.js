import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '4vh' }}>{this.props.brand}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <Link className="nav-link active" to="/register">Register <span class="sr-only">(current)</span></Link> */}
                        <Link className="nav-link active" to="/account">Authentication <span class="sr-only">(current)</span></Link>
                        {
                            this.props.role == "admin" &&
                            <Link className="nav-link active" to="/user-list">User Management <span class="sr-only">(current)</span></Link>
                        }
                    </div>
                </div>
                <div>
                    <h5 className="text-white m-1">
                        {this.props.username && `Welcome, ${this.props.username}`}</h5>
                </div>
            </nav>
        );
    }
}

// fungsi untuk mengambil data dari reducer/store
const mapStateToProps = (state) => {
    return {
        username: state.authReducer.username,
        role: state.authReducer.role
    }
}

export default connect(mapStateToProps)(Navbar);