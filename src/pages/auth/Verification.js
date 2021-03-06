import axios from 'axios';
import React from 'react';
import { URL_API } from '../../helper'
import { Link } from "react-router-dom";


class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.token);
        axios.patch(URL_API + `/users/verified`, {}, {
            headers: {
                'Authorization': `Bearer ${this.props.match.params.token}`
            }
        }).then(res => {
            this.setState({ message: 'Your Account Verified ✔' })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
          <div className="container p-5">
            <h2>
              {this.state.message} Click <Link to="/">Here</Link> to
              back on Home
            </h2>
          </div>
        );
    }
}

export default Verification;