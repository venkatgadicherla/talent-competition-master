import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import StatusButton from '../../Layout/ExpiryButton.jsx';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobid:""
        }
        this.gotoPageEdit = this.gotoPageEdit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.closeJob = this.closeJob.bind(this);
        
      
    }
    
    onClick(e) {
       
        var id = e.target.id;
        this.setState({ jobid: id }, this.closeJob(id));
      
       
    }
    closeJob(id) {
        var cookies = Cookies.get('talentAuthToken');
      
        $.ajax({
            url: 'http://localhost:51689/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify(id),
            type: "post",
           
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show(res.message, "success job closed", null, null);
                    window.location = "/ManageJobs";

                } else {
                    TalentUtil.notification.show(res.message, "error ", null, null)
                }

            }.bind(this)
        })
    }
    gotoPageEdit(e) {
        window.location = '/PostJob&id=' + e.target.id;
    }
    render() {
        var records;
        var divrecords;
        var divDis = "no records to display";
    
      
        debugger;

        if (this.props.data) {
            console.log(this.props.data);
            console.log(this.props.data.length);
            records = this.props.data;
           
            if (this.props.data.length > 0) {
                divDis =
                    records[this.props.pageIndex].map((job, key) =>


                    <div className="ui  six wide fluid column" style={{ height: "450px",  width: "400px"}}>
                            <div className="ui fluid padded grid" id="mainTable">
                                <div className="ui  fluid card" >
                                    <div className="ui content"  >
                                      
                                         
                                                <b>  {job.title}</b>
                                           
                                     
                                  
                                    <p> </p>  <a className="ui black right ribbon label"><i className="ui user icon"></i>{job.noOfSuggestions}</a>
                                        <p> </p>

                                        <p>{job.description}</p>
                                        <p>{job.location.country}</p>
                                        <p>{job.location.city}</p>
                                        <p> {job.expiryDate}</p>
                                    </div>


                                
                              
                                    <div className="ui extra content">
                                   
                                    <StatusButton date={job.expiryDate}></StatusButton>
                                   
                                    <div className="ui right floated mini basic blue  buttons">
                                        <div className="ui mini button" id={job.id} onClick={this.onClick}> <i className="ui hide icon"></i>Close</div>
                                        <div className="ui mini button" id={job.id} onClick={this.props.editClick}><i className="ui edit icon"> </i>Edit</div>
                                        <div className="ui mini button" id={job.id} onClick={this.props.copyClick}><i className="ui copy icon" > </i>Copy</div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>

                    );
            }

        }

        return (

            <div className="ui   three column  padded grid">
            <div className="ui stretched row">{divDis}</div>

            </div>



        )


    }

}