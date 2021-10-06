import axios from 'axios';
import React from 'react';
import { URL_API } from '../helper';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
            selectedIdx: null,
            passwordType: 'password',
            passShow: 'Show'
        }
    }

    componentDidMount() {
        this.getDataUser()
    }

    getDataUser = () => {
        axios.get(URL_API + '/users/get').then(res => {
            console.log(res.data)
            this.setState({ dataUser: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    onBtRegis = () => {
        let username = this.inUsername.value
        let password = this.inPassword.value
        let role = this.inRole.value
        console.log(username, password, role)

        axios.post(URL_API + '/tb_user', {
            username, password, role
        })
            .then(res => this.getDataUser())
            .catch(err => console.log(err))
    }

    onBtSave = (id) => {
        let username = this.newUsername.value
        let password = this.newPassword.value
        let role = this.newRole.value
        // PATCH : memperbarui data pada kolom data yg dipilih
        axios.patch(URL_API + `/tb_user/${id}`, { username, password, role })
            .then(res => {
                this.getDataUser()
                this.setState({ selectedIdx: null })
            })
            .catch(err => console.log(err))
        // PUT : mengganti data pada index/id data yang dituju
        // axios.put(URL_API + `/tb_user/${id}`, { username })
        //     .then(res => this.getDataUser()).catch(err => console.log(err))
    }

    onBtDelete = (id) => {
        axios.delete(URL_API + `/tb_user/${id}`)
            .then(res => {
                this.getDataUser()
            })
            .catch(err => {
                console.log(err)
            })
    }

    printData = () => {
        return this.state.dataUser.map((item, index) => {
            if (this.state.selectedIdx == index) {
                return <tr>
                    <td>{index + 1}</td>
                    <th><input className="form-control" type="text" ref={elemen => this.newUsername = elemen} placeholder="Username" defaultValue={item.username} /></th>
                    <th><input className="form-control" type="text" ref={elemen => this.newPassword = elemen} placeholder="Password" defaultValue={item.password} /></th>
                    <th><select className="form-control" type="text" ref={elemen => this.newRole = elemen} placeholder="Password" defaultValue={item.role}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select></th>
                    <th><button type="button" className="btn btn-outline-warning" onClick={() => this.onBtSave(item.id)}>Save</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button></th>
                </tr>
            } else {
                return <tr>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td><button type="button" className="btn btn-warning" onClick={() => this.setState({ selectedIdx: index })}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.onBtDelete(item.id)}>Delete</button></td>
                </tr>
            }
        })
    }

    onBtIdx = (idx) => {
        this.setState({ selectedIdx: idx })
    }

    onBtShowPass = () => {
        let { passShow, passwordType } = this.state
        if (passwordType == 'password') {
            this.setState({ passwordType: 'text', passShow: 'Hidden' })
        } else {
            this.setState({ passwordType: 'password', passShow: 'Show' })
        }
    }

    render() {
        return (
            <div className="container text-center">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printData()}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <th>#</th>
                            <th><input className="form-control" type="text" ref={elemen => this.inUsername = elemen} placeholder="Username" /></th>
                            <th>
                                <div className="input-group">
                                    <input className="form-control" type={this.state.passwordType} ref={elemen => this.inPassword = elemen} placeholder="Password" />
                                    <div className="input-group-append">
                                        <div className="input-group-text" onClick={this.onBtShowPass}>{this.state.passShow}</div>
                                    </div>
                                </div>
                            </th>
                            <th><select className="form-control" type="text" ref={elemen => this.inRole = elemen} placeholder="Password">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select></th>
                            <th><button type="button" className="btn btn-info" onClick={this.onBtRegis}>Submit</button></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        );
    }
}

export default UserList;