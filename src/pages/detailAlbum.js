import React from 'react';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state
        }
    }
    render() {
        console.log(this.state.data)
        return (
            <div>
                <h1>Detail Page</h1>
            </div>
        );
    }
}

export default DetailPage;