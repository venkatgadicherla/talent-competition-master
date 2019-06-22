import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, TableBody } from 'semantic-ui-react';
import PageButton from '../../Layout/JobRecords.jsx';
import PageButtonIndex from '../../Layout/PageButton.jsx';
import Filter from '../../Layout/Filter.jsx';
import NavigationBar from '../../Layout/NavigationBar.jsx';
import JobRecords from '../../Layout/JobRecords.jsx';
import SortByDate from '../../Layout/SortByDate.jsx';
import EditJob from './EditJob.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData;
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            showFilter: false,
            jobList: null,
            editJob:false,
            loaderData: loader,
            activePage: 1,
            totalJobs: 0,
            noOfRecords: 2,
            pages: null,
            showActive: false,
            showExpired: false,
            showClosed: false,
            index: 0,
            sortByDate:"null",
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: false,
                showExpired: false,
                showUnexpired: false
            },
            totalPages: 1,
            activeIndex: ""
           

        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.displayJobs = this.displayJobs.bind(this);
        this.pagifyTheList = this.pagifyTheList.bind(this);
        this.printCount = this.printCount.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.filterClicked = this.filterClicked.bind(this);
        this.setNoOfRecords = this.setNoOfRecords.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.updateState = this.updateState.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.setCopy = this.setCopy.bind(this);
        //your functions go here
    };
    onClick() {
        //alert("ButtonClicked");
    }
    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)

    }

    componentDidMount() {
        this.init();
        this.loadData();
        this._mounted = true;
       

    };
    componentWillUnmount() {
        this._mounted = false
    }
    printCount() {

    }
    filterClicked() {
        this.setState({ showFilter: !this.state.showFilter });
        //alert(this.state.showFilter);

    }
    setFilter(control) {

        if (this._mounted) {
            switch (control) {
                case 'desc':

                    this.setState({ sortByDate: control, activePage: 1 }, 
                        () => {
                        this.updateState(this.state.sortByDate, this.loadData())
                    });
                    break;
                case 'asec':
                    this.setState({ sortByDate: control, activePage: 1  }, () => {
                        this.updateState(this.state.sortByDate, this.loadData())
                    });
                    break;
                case 'active':
                    //alert('current one');
                    //this.setState({ showExpired: false });
                    this.setState({ showActive: true, showExpired: false,  activePage: 1 }, () => {
                        this.updateState(this.state.showActive, this.state.showExpired, this.loadData())
                    });
                    break;
                case 'expired':

                   // this.setState(({ showActive: false }));
                    this.setState({ showExpired: true, showActive: false, showClosed: false, activePage: 1 }, () => {
                        this.updateState(this.state.showExpired, this.loadData())
                    });
                    break;
                case 'closed':

                    // this.setState(({ showActive: false }));
                    this.setState({ showExpired: false, showActive: false, showClosed:true,activePage: 1 }, () => {
                        this.updateState(this.state.showClosed, this.loadData())
                    });
                    break;
                    

            }
           
        }
           
           
        }
    setEdit(e) {
        
        Cookies.set('editId', e.target.id);
        window.location.href = '/PostJob';
      //  alert(Cookies.get('edit'));
    }
    setCopy(e) {
        Cookies.set('copyId', e.target.id);
        window.location.href = '/PostJob';
    }
    updateState(callback) {
       
        callback;
     
    }
    setIndex(e) {

       
            
        switch (e.target.id) {
                case 'Prev':
                
                        if (this.state.activePage >1) {
                            this.setState({ activePage: this.state.activePage - 1 }
                                
                            );
                }

                        break;
            case 'Next':
               
                if (this.state.activePage < this.state.totalPages) {
               
                    this.setState({ activePage: this.state.activePage + 1 });
                }
                    break;
            case 'Last':
            
                if (this.state.activePage != this.state.totalPages) {
                    this.setState({ activePage: this.state.totalPages});
                    }
                    break;
                case 'First':
                if (this.state.activePage != 0) {
                    this.setState({ activePage: 1});
                    }
                    break;
               
            }
            
        


    }

    loadData(callback) {
        
        var thisVar = this;
        var cookies = Cookies.get('talentAuthToken');
        var sort = this.state.sortByDate;
        let count;
        $.ajax({
            url: 'http://localhost:51689/listing/listing/getSortedEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",

            data: {
                activePage: this.state.activePage,
                sortbyDate: this.state.sortByDate,
                showActive: this.state.showActive,
                showClosed: this.state.showClosed,
                showDraft: false,
                showExpired: this.state.showExpired,
                showUnexpired: false



            },

            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let jobList = null;


                if (res.myJobs) {
                    jobList = res.myJobs;


                    this.displayJobs(jobList)

                }
            }.bind(this),

            error: function (res) {
                console.log(res.status)
            }
        })


    }
    pagifyTheList(list, pageSize) {
        var pagifiedList = [];
        console.log(list.length);

        var noOfPages = Math.ceil(list.length / pageSize);

        this.setState({ totalPages: noOfPages });//This variable is set here to facilitate no of buttons to be displayed but this is not being used as 
                                                  // I have altered the design of the page

        for (var i = 0; i < noOfPages; i++) {
            var newArr = list.splice(0, pageSize);

            pagifiedList.push(newArr);
        }
        
        this.setState({ pages: pagifiedList });//The pages are pages of jobs which are displayed a single page at a time
    }
    setNoOfRecords(noOfRecords) {
        //used to set no of records displayed per page
        this.setState({ noOfRecords: noOfRecords });
        //alert(this.state.noOfRecords);
        this.loadData();

    }
    displayJobs(jobList) {
        if (this._mounted) {
            var list = jobList;
            this.setState({
                jobList: list
            });
            this.pagifyTheList(this.state.jobList, this.state.noOfRecords);
            console.log("FromDisplyList");

        }
    }
    loadNewData(data) {
        //Havent utilised this method not sure yet.
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
       const categoryListItems = [
            {
                 id : "expired",
                 displayText : "Show Expired",
                 displayColor:"ui red empty circular label"
            },
            {
                id : "active",
                displayText : "Show Active",
                displayColor:"ui green empty circular label"
            },
            {
                id : "closed",
                displayText : "Show Closed",
                displayColor:"ui brown empty circular label"
            },
             {
                id : "Draft",
                displayText :"Show Draft",
                displayColor:"ui grey empty circular label"
            }
        ];
        
        

        return (
            < BodyWrapper reload={this.init} loaderData={this.state.loaderData} >
                <div className="ui page grid" >
                    <div className="ui row">
                        <h1>List of Jobs</h1>
                    </div>
                    <div className="ui  row">
                        <div className="ui four column grid">
                            <div className="ui  column">  <Filter listItems={categoryListItems} setFilter={this.setFilter} icon="filter icon"></Filter></div>
                            <div className="ui  column"> <SortByDate setFilter={this.setFilter}></SortByDate></div>

                        </div>
                    </div>

                    <div className="ui stretched row">

                        <JobSummaryCard data={this.state.pages} noOfJobs='' pageIndex={this.state.activePage - 1} noOfRecordsperPage="5" editClick={this.setEdit} copyClick={this.setCopy}></JobSummaryCard>

                    </div>
                    <div className="ui four wide right aligned row">

                        <div className="ui center aligned column">
                            <div className="ui basic buttons">
                                <PageButtonIndex label="<<" onClick={this.setIndex} id="First"></PageButtonIndex>

                                <PageButtonIndex label="<" onClick={this.setIndex} id="Prev"></PageButtonIndex>

                                <PageButtonIndex label={this.state.activePage} id="index"></PageButtonIndex>

                                <PageButtonIndex label=">" onClick={this.setIndex} id="Next"></PageButtonIndex>

                                <PageButtonIndex label=">>" onClick={this.setIndex} id="Last"></PageButtonIndex>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyWrapper >
        )
    }
}