import React from 'react';
export default class JobRecords extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lsit: null

        }

    }
    componentDidMount() {
        $("#mainTable").width(100).height(1000);
    };


    render() {
        var records;
        var divrecords;
        var divDis = "no records to display";
        //console.log(this.props.data)
        //console.log(this.props.pageIndex);
        debugger;

        if (this.props.data) {
            console.log(this.props.data);
            console.log(this.props.data.length);
            records = this.props.data;
            // this.props.pageIndex;
            if (this.props.data.length > 0) {
                divDis =
                    records[this.props.pageIndex].map((job, key) =>


                        <div className="ui six wide fluid column">
                        <div className="ui six wide flexi padded grid" id="mainTable">
                                <div className="ui  fluid card" >
                                    <div className="ui content"  >
                                        <div className="ui content" >
                                            <div className="ui sub header">
                                                <b>  {job.title}</b>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ui content">
                                        <p> </p>  <a className="ui black right ribbon label">{job.noOfSuggestions}</a>
                                        <p> </p>

                                        <p>{job.description}</p>
                                        <p>{job.location.country}</p>
                                        <p>{job.location.city}</p>
                                        <p> {job.expiryDate}</p>
                                    </div>


                                    <div className="ui extra content">
                                       
                                    <div className="ui six wide padded grid">
                                        <div className="ui stackable grid">
                                            
                                                  
                                                        <div>
                                                            <div className="ui  mini left floated red color button">Expired</div>
                                                        </div>
                                                        <div>

                                                            <div className="ui  mini basic blue stackable buttons">
                                                            <div className="ui mini button"> <i className="ui hide icon"></i>Close</div>
                                                            <div className="ui mini button"><i className="ui edit icon"> </i>Edit</div>
                                                            <div className="ui mini button"><i className="ui copy icon"> </i>Copy</div>

                                                            </div>
                                                        </div>
                                                   
                                                
                                            </div>
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

