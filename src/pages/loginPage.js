import axios from 'axios';
import React from 'react';
import { URL_API } from '../helper';
import { Redirect } from 'react-router-dom'
import { authLogin } from '../actions'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: 'none',
            redirect: false
        }
    }

    onBtLogin = () => {
        axios.post(URL_API + `/users/login`, {
            email: this.inEmail.value,
            password: this.inPass.value
        })
            .then(res => {
                localStorage.setItem("token_shutter", res.data.token)
                // menjalankan fungsi action
                this.props.authLogin(res.data.dataLogin)
                this.setState({ redirect: true })
                console.log('Login Success ✔')
                this.inUsername.value = ''
                this.inPass.value = ''
            })
            .catch(err => console.log(err))
    }

    onBtRegister = () => {
        let username = this.regisUsername.value
        let email = this.regisEmail.value
        let password = this.regisPass.value
        let confPassword = this.regisConfPass.value
        console.log(username, password)

        if (username == "" || email == "" || password == "") {
            alert('Fill in all the form')
        } else {
            axios.post(URL_API + '/users/regis', {
                username, email, password
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }

    render() {
        if (this.state.redirect) {
            console.log('Redirect')
            return <Redirect to='/' />
        }
        return (
            <div className="row my-5" style={{ width: '70vw', margin: 'auto' }} >
                <div className="col-md-6" style={{ borderRight: '1px solid gray' }}>
                    <h3 className="my-4 text-center">Login Page</h3>
                    <div className="alert alert-danger" style={{ display: this.state.alertShow }} role="alert">
                        Account not found !
                    </div>
                    <form>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Email" type="text" ref={el => this.inEmail = el} />
                        </div>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Password" type="password" ref={el => this.inPass = el} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.onBtLogin}>Login</button>
                    </form>
                </div>
                <div className="col-md-6" style={{ borderLeft: '1px solid gray' }}>
                    <h3 className="my-4 text-center">Register Page</h3>
                    {/* <div className="alert alert-danger" style={{ display: this.state.alertShow }} role="alert">
                        Account not found !
                    </div> */}
                    <form>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Username" type="text" ref={el => this.regisUsername = el} />
                        </div>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Email" type="text" ref={el => this.regisEmail = el} />
                        </div>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Password" type="password" ref={el => this.regisPass = el} />
                        </div>
                        <div className="input-group my-4">
                            <input className="form-control" placeholder="Confirmation Password" type="password" ref={el => this.regisConfPass = el} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.onBtRegister}>Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

/**
 * connect : untuk menghubungkan action atau reducer dengan sistem redux
 * connect(param1, {..param2})
 * param1: berisi fungsi untuk mengambil data dari reducer/store, diisi jika dibutuhkan
 * ...param2 : berisi fungsi-fungsi action yang akan digunakan, diisi jika dibutuhkan
 *  */
export default connect(null, { authLogin })(LoginPage);