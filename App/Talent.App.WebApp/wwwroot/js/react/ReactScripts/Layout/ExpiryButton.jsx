
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
export default class StatusButton extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    };
    render() {
        var currentDate = new Date();

        var propsDate = new Date(this.props.date);
  
        if (currentDate > propsDate) {
            console.log("expired");
        } 
        else {
            console.log("Active");
        }
        
        var controlDesc = {
            className: currentDate > propsDate ? "ui mini left floated padded red color button" : "ui mini left floated padded  green color button",
          
            value: currentDate > propsDate ? "Expired" : "Active"
        };
        
        return (

            <button className={controlDesc.className}> {controlDesc.value} </button>



        )
    }
}
