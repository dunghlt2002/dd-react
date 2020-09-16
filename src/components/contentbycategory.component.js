import React, { Component } from 'react';
import {Link,} from "react-router-dom";
import { connect } from 'react-redux';
import contentDataService from "../services/content.service";
import Content from './content.component';

class ContentByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            API_URL: process.env.REACT_APP_URL,
            data:null ,
            searchKeyword: '',
            showForm: false,
            showAddButton: false,
            currentContent:'',
            showDeleteButton:false
        }
    }

    toMyFormatDate(ngay) {
        var ngayve;
        if (ngay !== null) {
            // ngayve = ngay.split('-')[0] + '/' + ngay.split('-')[1] + '/' + ngay.split('-')[2] + ' --- ' + ngay.split('T')[0]
            ngayve = ngay.split('T')[0] + ' at ' + ngay.split('T')[1].slice(0,8)
        }
        return ngayve
    }

    componentWillMount() {
        
        this.retrieveContentsByCat(this.props.categoryId)
        // this.retrieveContents(1,this.state.searchKeyword)

        // const cu = localStorage.getItem('user');
        // if(cu !== null) {
        //     this.setState({
        //     currentContent: localStorage.getItem('user')
        //     })
        //     console.log('C-U trong trade.js   :  ' + this.state.createdby);
        // }
        // if(cu === this.props.createdby) {
            this.setState({
                // showEditButton: true,
                showDeleteButton: true,
            })
            
        //     console.log('data :  ' + this.state.data);
        // } 

    }
    // retrieveContents(currentPage, keyword) {
    //     console.log('key ' + this.state.searchKeyword);
    //     contentDataService.getAll(currentPage,keyword)
    //       .then(response => {
    //         this.setState({
    //           data: response.data.data,
    //           totalPages: response.data.pages
    //         });
    //         console.log('server' + response.data.data);
    //         console.log('this state' + this.state.data);
    //         console.log('ket qua total pages' + response.data.pages);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   }

    retrieveContentsByCat = (cat_id) => {
        console.log('contents loading by cat ID truyen tu List qua: ' + cat_id);

        contentDataService.getAllByCat(cat_id)
        .then(response => {
            this.setState({
                data: response.data
            });
            // console.log('content data o server: ' + JSON.stringify(response.data));
            console.log('content data tra ve: ' + JSON.stringify(this.state.data));
        })
        .catch(e => {
            console.log(e);
        });
}

    printData = () => {
          if(this.state.data !== null){
           return  this.state.data.map((value,key)=> 
              (<Content
                  key={key}
                  contentId={value.id}
                  subject={value.subject}
                  content_cat_id={value.content_cat_id}
                  c_view={value.c_view}
                  b_image={value.b_image}
                  s_image={value.s_image}
                  updatedAt={value.updatedAt}
                  createdAt={value.createdAt}
                  createdby={value.createdby}   
              />)
            )
          }
      }

    renderDeleteButton = () => {
        // keu editTrade de load du lieu vao object
        const datatemp = this.editTrade; 
        // console.log('datatemp ' + datatemp);

        return (
        
            <div className="btn-group float-right">

            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 || this.props.currUser.userInfo.user === this.props.createdby ?
                <div className="btn-group float-right">
                    <Link to={"/editContent/" + this.props.contentId}
                        className="btn btn-block btn-success" > 
                        Edit
                    </Link>
                </div>   
            : null ) : null
            }

            </div>
            
        )
    }

    //Chuyen doi van de duong link
    chuyenDoiURL = (str) =>
    {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();     
        
        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
        
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');
        
        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');
        
        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');
        
        // return
        return str;
    }

 
    render() {
        return (

            <div className="card border-primary mb-3 mt-2 col-10">
            <div className="col-10">
              <div className="row">
                  <strong>{this.props.content_cat_desc} (ID: {this.props.categoryId})</strong>

              </div>
            </div>

                  {this.printData()}
          </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('userSignin trong Trade.js ' + JSON.stringify(state.userSignin));
    return {
        currUser: state.userSignin
    }
  }
  
export default connect(mapStateToProps, null)(ContentByCategory);

