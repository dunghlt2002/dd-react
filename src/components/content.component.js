import React, { Component } from 'react';
import {Link,} from "react-router-dom";
import { connect } from 'react-redux';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            API_URL: process.env.REACT_APP_URL,
            data:{} ,
            id:'',
            selectedFile:'none',
            showForm: false,
            showAddButton: false,
            currentContent:'',
            // showEditButton:false,
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

        <div className="card-header col" >
                                        
            {/* Hinh size nho, avatar  */}
            <div className="float-left col-3">
            <Link to={"/contentdetail/" + this.chuyenDoiURL(this.props.subject) + "." + this.props.contentId + ".html"}>
                {/* <Link to={"/contentdetail/" + "." + this.props.contentId + ".html"}> */}
                    {/* uploads folder is the same level of app folder */}
                    <img className="card-img-top" src={this.state.API_URL + "uploads/" + this.props.s_image} alt={this.props.s_image}/></Link>
            </div>
    
            {/* subject va cac thong tin quan trong header */}
            <div className="float-left">
                <div>
                <Link to={"/contentdetail/" + this.chuyenDoiURL(this.props.subject) + "." + this.props.contentId + ".html"}>{this.props.subject + "."}</Link>
                </div>
                <div>
                    <b className=" float-right">
                        <i className=" float-right">
                            {'=> View(s): ' + this.props.c_view + ' in category ID: ' + this.props.content_cat_id}
                        </i>
                    </b>
                </div>
                <h5>
                    <div >Created by: {this.props.createdby}.</div>
                    <div >Created date: 
                        {
                        this.toMyFormatDate(this.props.createdAt)
                        }.</div>
                    <div >Last updated: {this.toMyFormatDate(this.props.updatedAt)}.</div>
                </h5>
                <br></br>
            </div>
            <div className="float-right">
                {this.state.showDeleteButton && this.renderDeleteButton()}
            </div>
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
  
export default connect(mapStateToProps, null)(Content);

