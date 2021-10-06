import React from 'react';
import Card from '../components/card'
import axios from 'axios';
import { URL_API } from '../helper';
import { getAlbum } from '../actions'
import { connect } from 'react-redux'


// Penulisan class component
class LandingPage extends React.Component {
    // untuk menyimpan data state
    constructor(props) {
        super(props);
        this.state = {
            content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
            count: 0,
            dataEmail: [],
            datAlbum: []
        }
    }
    // component life cycle
    /**
     * componentWillMount() : fungsi yg berjalan sebelum component dirender
     * componentDidMount() : fungsi yg berjalan setelah component dirender, untuk proses pemanggilan URL_API atau deklarasi state diawal render
     * componentDidUpdate() : fungsi yg berjalan setelah component render yg bersifat stand by.
     */
    componentDidMount() {
        // masukkan fungsi yang akan dijalankan
        this.getDataAlbum()
        // deklarsi state
    }

    getDataAlbum = () => {
        axios.get(URL_API + '/album/get')
            .then(res => {
                this.setState({ datAlbum: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onBtAdd = () => {
        if (this.state.addFile) {
            let formData = new FormData()

            let obj = {
                title: this.inputTitle.value,
                description: this.inputDescription.value
            }

            formData.append('data', JSON.stringify(obj))
            formData.append('file', this.state.addFile)
            axios.post(URL_API + '/album/upload', formData)
                .then(res => {
                    this.getDataAlbum()
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    onBtAddFile = (e) => {
        if (e.target.files[0]) {
            this.setState({ addFileName: e.target.files[0].name, addFile: e.target.files[0] })
            let preview = document.getElementById("imgpreview")
            preview.src = URL.createObjectURL(e.target.files[0])
        }
    }

    // tempat membuat fungsi
    printCard = () => {
        let { datAlbum } = this.state
        return datAlbum.map((item, index) => {
            return <Card title={item.title}
                description={item.description} image={URL_API + item.image} />
        })
    }
    // tempat membuat tampilan
    render() {
        console.log('dataAlbum awal', this.state.datAlbum)
        return (
            <div style={{ backgroundColor: '#F8F9FA' }}>
                <div className="jumbotron mb-2 row" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-6">
                        <div style={{ width: '90%' }} className="m-auto">
                            <h1 className="display-4">Album Example</h1>
                            <p className="lead">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet,
                        but not too short so folks don’t simply skip over it entirely.</p>
                            <button className="btn btn-primary btn-lg">Your Album</button><button className="btn btn-secondary btn-lg">Their Album</button>
                        </div>
                    </div>
                    <di className="col-md-3">
                        <img id="imgpreview" width="100%" />
                    </di>
                    <div className="col-md-3 p-4 bg-dark text-white text-left">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" ref={elemen => this.inputTitle = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea type="textarea" className="form-control" id="description" aria-describedby="emailHelp" ref={elemen => this.inputDescription = elemen} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input type="file" className="form-control" id="img" aria-describedby="emailHelp" onChange={this.onBtAddFile} ref={elemen => this.inputImage = elemen} />
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary float-right" onClick={this.onBtAdd}>Add Data</button>
                    </div>
                </div>
                <div className="row container m-auto">
                    {this.printCard()}
                </div>
            </div>
        );
    }
}
// Untuk ambil data dari reducer
const mapStateToProps = (state) => {
    console.log('cek data', state.albumReducer.dataAlbum)
    return {
        dataAlbum: state.albumReducer.dataAlbum
    }
}

export default connect(mapStateToProps, { getAlbum })(LandingPage);