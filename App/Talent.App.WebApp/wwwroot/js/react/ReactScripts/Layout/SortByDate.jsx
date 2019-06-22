import React from 'react';
import ReactDOM from 'react-dom';
import FormItemWrpaper from '../Form/FormItemWrapper.jsx';
import { Select } from '../Form/Select.jsx';


export default class SortByDate extends React.Component {
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
        $('#selectSort')
            .dropdown({ useLabels: false });
      
    }
   
    selectedOption(e) {
        
       
     
       this.props.setFilter(e.target.id);
     

    }

    render() {

        return (
            <div className="ui  dropdown" useLabels="false" id="selectSort">
            

                <i className="calendar icon"></i>
                <span className="text">Sort By Date</span>
                <div className="menu">

                    <div className="scrolling menu">
                        <div className="item" data-value="important" id="desc" onClick={this.selectedOption} >
                            <div className="ui red empty circular label"></div>
                           Newest First
      </div>
                        <div className="item" data-value="announcement" id="asec" onClick={this.selectedOption}>
                            <div className="ui blue empty circular label"></div>
                            Oldest First
      </div>
                        

                    </div>

                </div>
            </div>


        )
    }
    //< div >
    //    {
    //        this.props.show ?
    //            < div className={this.props.columnSize} >
    //                <div className="ui  segment">

    //                    <button className=" ui red button" onClick={this.setNoOfrecords}> Show Jobs </button>
    //                    <Select name="showExpired" options={this.state.showExpiryOptions} selectedOption="Show expired" controlFunc={this.setNoOfrecords} placeholder="Show Expired">
    //                    </Select>
    //            </div>
    //            </div> :
    //            <div>
    //            </div>
    //    }
    //    </div >




}
