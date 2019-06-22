import React from 'react';
import ReactDOM from 'react-dom';
import FormItemWrpaper from '../Form/FormItemWrapper.jsx';
import { Select } from '../Form/Select.jsx';


export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setNoOfrecords: 1,

            showExpired: false,
            showActive: false

        }
        this.selectedOption = this.selectedOption.bind(this);

    }

    componentDidMount() {
        $('#selectFilter')
            .dropdown({ useLabels: true });
       
    }

   
    selectedOption(e) {
        //this.setState({ showExpired: !this.state.showExpired }, () => console.log(this.state.showExpired));
        alert(e.target.id);
        this.props.setFilter(e.target.id);
        //alert(this.state.showExpired);

    }

    render() {
        var items = this.props.listItems.map((item, key) =>
           
                <div className="item" id={item.id} onClick={this.selectedOption} >
                    <div className={item.displayColor}></div>
                    {item.displayText}
                </div>
          
           
        );
        return (
            <div className="ui  dropdown"  id="selectFilter">
                <i className={this.props.icon}> </i>
               
                <span className="text">Filter Posts</span>
                <div className="menu">

                    <div className="scrolling menu">
                     
                        {items}
                   
                      
                       
                       
                </div>
            </div>
                </div>

        )
    }

}