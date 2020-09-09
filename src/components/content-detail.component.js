import React, { Component } from 'react';
import contentDataService from "../services/content.service";
import {NavLink, Link  } from "react-router-dom";
import { connect } from 'react-redux';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            API_URL: process.env.REACT_APP_URL,
            currentContent:null ,
            subject:'',
            c_view:'',
            content_cat_id:'',
            c_body:'',
            s_image:'',
            b_image:''
        }
        }
      
    componentDidMount() {
        console.log('param  :' + parseInt(this.props.match.params.id));   // co param id roi
        this.getContentData(parseInt(this.props.match.params.id));
        if(this.state.currentContent === null ){
            // this.getContentData(parseInt(this.props.match.params.id));
        //     getContentData(parseInt(this.props.match.params.id)).then((res)=>{
        //         //console.log('vo day roi  ' + res);
        //     this.setState({
        //       data:res
        //     });
        //     //console.log('vo day roi lay data xem ' + this.state.data);    // co data roi
        //   })
        }
    }

    getContentData(id) {
        console.log('user id trg getContentData: ' + id);
        contentDataService.get(id)
          .then(response => {
            this.setState({
                currentContent: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  
    printData = () => {
        if(this.state.currentContent !== null){
         return (
           
            <div className="container">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <div className="card border-primary mb-3 mt-2">
                        <div className="card-header"><h2>{this.state.currentContent.subject}</h2>
                            <div>
                                <Link to="/contents/1?searchKeyword=" >Back to Content List</Link>
                            </div>
                            <div className="card-body text-primary">
                                <div className="row">
                                    <div className="col">
                                        <h5>
                                            <div >Created by: {this.state.currentContent.createdby}.</div>
                                            <div >Created date: {this.state.currentContent.createdAt}.</div>
                                            <div >Last updated: {this.state.currentContent.updatedAt}.</div>
                                        </h5>

                                        <br></br>
                                        <div >Category ID: {this.state.currentContent.content_cat_id} 👍</div>
                                        <div >: View: {this.state.currentContent.c_view} 👍</div>
                                        <br></br>
                                    </div>
                                    <div className="col-3">
                                        <img width="80%" src={this.state.API_URL + "uploads/" + this.state.currentContent.s_image} className="img"  alt="" />
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: this.state.currentContent.c_body }}></div>
                                    
                                </div>
                                <br></br>
                                <img width="100%" src={this.state.API_URL + "uploads/" + this.state.currentContent.b_image} className="img"  alt="" />

                            </div>    
                        </div>
                    </div>
                </div>
            </div>
                
        )
        }
    }
    
    render() {
        console.log('Trade Detail here');
        //console.log('param  :' + parseInt(this.props.match.params.id));   // co param id roi
        //console.log('vo day roi lay data xem tin tuc ' + JSON.stringify(this.state.data));    // co data roi
        return (
        <div>
            <header className="masthead tintuc">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-lg-12 my-auto">
                        <div className="header-content mx-auto">
                            <h1 className="mb-1">Trade in Details</h1>
                        </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Begin trade detail */}
                {this.printData()}                
            {/* End trade detail */}

        </div>
        // End of retrun
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('userSignin trong Trade.js ' + JSON.stringify(state.userSignin));
    return {
        currUser: state.userSignin
    }
  }
  
export default connect(mapStateToProps, null)(ContentDetail);
//   export default ContentDetail;
//import { connect } from 'react-redux';
  
  
  