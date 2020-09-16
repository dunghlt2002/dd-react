import React, { Component } from 'react';
import '../App.css';
import ContentByCategory from './contentbycategory.component';
import {NavLink, Link  } from "react-router-dom";
import contentDataService from "../services/content.service";
import content_categoryDataService from "../services/content_category.service";
// import Pagination from 'pagination-component';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import myUtility from "../utils/utility";

class content_categoryList extends Component {
  constructor(props) {
    super(props);
    
    let url = this.props.location.search;
    let params = queryString.parse(url);

    this.state = {
      masterCategories: [],
      topFive: 5   // lay 5 symbol hot nhat
      // showForm: false,
      // showAddButton: true,
      // addclosebutton:'DD Analysis',
      // showButton:false,
      // postsPerPage:15,
      // totalPages: 1,
      // currentPage: 1,
      // currentTransaction: null,  // currentUser
      // currentIndex: -1  // phan tu dau tien trong list duoc selected
    }
    this.onClick = this.onClick.bind(this);
    // this.retrieveContentsByCat = this.retrieveContentsByCat.bind(this);
  }

    componentWillMount() {
    console.log('props ' + JSON.stringify(this.props.match));
    this.retrieveContent_cats();
  }

  retrieveContent_cats() {
    content_categoryDataService.getAll()
      .then(response => {
        this.setState({
          masterCategories: response.data,
          totalPages: response.data.pages
        });
        console.log('masterCategories ' + JSON.stringify(response.data));
        // console.log('ket qua total pages' + response.data.pages);
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  onClick () {
      this.setState({showForm: !this.state.showForm})
      console.log('form ' + this.state.showForm);
      if(this.state.addclosebutton === "DD Analysis") {
        this.setState({addclosebutton: "Close"})
      } else {
        this.setState({addclosebutton: "DD Analysis"})
      }
  }

printCategory = () => {
  console.log('vo print Category list ' + JSON.stringify(this.state.masterCategories));
    if(this.state.masterCategories !== null){
     return  this.state.masterCategories.map((value,key)=> 
        (<ContentByCategory
            key={key}
            categoryId={value.id}
            content_cat_desc={value.content_cat_desc}
            updatedAt={value.updatedAt}
            createdAt={value.createdAt}
            createdby={value.createdby}   
        />)
      )
    }
}

// khong xai function nay o day
retrieveContentsByCat = (cat_id) => {
  console.log('contents loading by cat ID: ' + cat_id);
  var contentData = [];
  contentDataService.getAllByCat(cat_id)
    .then(response => {
      console.log("Noi dung chinh" + JSON.stringify(response.data));
      contentData = response.data;
      return response.data;
    })
    .catch(e => {
      console.log(e);
    });
    // console.log("Noi dung chinh" + JSON.stringify(contentData));
   
}
  
render() {
    return (
      <div>
          <header className="masthead">
            <div className="col-lg-12 my-auto">
                <div className="header-content mx-auto">
                    <h1>Contents Collection by Category</h1>
                </div>
            </div>
          </header>
      
              {/* We want to show the form if the state is true */}
              {this.state.showAddButton && this.renderAddButton()}
              
              { this.props.currUser.userInfo ? 
                <div className="col-divide-header">
                    Hihihihi - Good Day {this.props.currUser.userInfo.user}, <Link to="/addcontent">ADD NEW CONTENT</Link>
                </div>
                : null
              }

              {/* Bat dau phan trading list chinh */}
              <div className="container-fluid col-12">
                  <div className="row">
                    <div className="card border-secondary mb-3 mt-2 col-2">
                      <div>
                      <ul className="list-item">
                          
                          <li>
                            <a href={'/content_cats'}>ALL categories</a>
                          </li>
                          {this.state.masterCategories.reverse().map((mastercategory,key) => 
                          <li key={key}>
                            <a href={'/contents/1?searchKeyword='+ mastercategory.id}>{mastercategory.id + " (" + mastercategory.content_cat_desc + ")"}</a>
                          </li>
                          )} 
                      </ul>

                        
                      </div>
                    </div>

                    <div className="card border-primary mb-3 mt-2 col-10">
                      <div className="col-10">
                        <div className="row">
                            
                            <div className="col-divide-header">
                              <a href={'/content_cats'}>ALL </a> or Top 5:
                            </div>
                           
                            <div className="col-divide">
                                {this.state.masterCategories.slice(0,this.state.topFive).map((masterFive, key) => 
                                    <a key={key} href={'/contents/1?searchKeyword='+ masterFive.id}>{masterFive.content_cat_desc + "  "}</a>
                                  )}
                            </div>

                        </div>
                      </div>

                          {this.printCategory()}

                    </div>
                    {/* Ket thuc phan trading list chinh */}
                  </div>
              </div>


      </div>
  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong user List ' + JSON.stringify(state.userSignin.userInfo));
  
  return {
      currUser: state.userSignin
  }
}
export default connect(mapStateToProps, null)(content_categoryList);


