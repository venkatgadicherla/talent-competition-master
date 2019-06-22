import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
export default class PageButtonIndex extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    };
    render() {
    return(

        <button className=" ui border less button" onClick={this.props.onClick} id={this.props.id}> {this.props.label} </button>



        )
    }
}