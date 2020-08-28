import React, { Component } from 'react';
import {Link,NavLink, Redirect} from "react-router-dom";
import dailystockDataService from "../services/dailystock.service";
import { connect } from 'react-redux';

class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            API_URL: process.env.REACT_APP_URL,
            data:{} ,
            id:'',
            selectedFile:'none',
            showForm: false,
            showAddButton: false,
            currentuser:'',
            // showEditButton:false,
            showDeleteButton:false
        }
    }

    componentWillMount() {
        // const cu = localStorage.getItem('user');
        // if(cu !== null) {
        //     this.setState({
        //     currentuser: localStorage.getItem('user')
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

    translateIndicatorColor = (color) =>
    {
        var strColor = '';
        if (color == 1) {
            strColor = " Green"
        } else if (color == 2) {
            strColor = "Red"
        } else {
            strColor = "Black"
        }
        
        return strColor

    }


    // Chuan bi du lieu vao item obj de load vao modal form de edit
    editTradeeeeeeee = () => {
        console.log('edit chuan bi');
        
        var item={};
        item.id = this.props.tradeId;
        item.title = this.props.title;
        item.symbolcode = this.props.symbolcode;
        item.timeframe = this.props.timeframe;
        item.entrypoint = this.props.entrypoint;
        item.exitpoint = this.props.exitpoint;
        item.buyshort = this.props.buyshort;
        item.symbolcode = this.props.symbolcode;
        item.stocolor = this.props.stocolor;
        item.rsicolor = this.props.rsicolor;
        item.macdcolor = this.props.macdcolor;
        item.macd_htf = this.props.macd_htf;
        item.qty = this.props.qty;
        item.s_image = this.props.s_image;
        item.b_image = this.props.b_image;
        item.createdby = this.props.createdby;
        item.created_at = this.props.created_at;
        item.updated_at = this.props.updated_at;

        return item;
    }
    renderDeleteButton = () => {
        
        // keu editTrade de load du lieu vao object
        const datatemp = this.editTrade; 
        // console.log('datatemp ' + datatemp);

        return (
        
            <div className="btn-group float-right">
            

            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 || this.props.currUser.userInfo.user === this.props.createdby ?
                <div className="btn-group float-right">
                    <Link to={"/editTrade/" + this.props.tradeId}
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

    translateBuyShort = (color) =>
        {
            var strBSColor = [];
            if (color == 1) {
                strBSColor = ["Buy","Green"]
            } else if (color == 2) {
                strBSColor = ["Short","Red"]
            }
            
            return strBSColor

        }

    

  
    render() {
        return (

        <div className="card-header col" >
                                
            {/* Hinh size nho, avatar  */}
            <div className="float-left col-3">
                <Link to={"/tradedetail/" + this.chuyenDoiURL(this.props.title) + "." + this.props.tradeId + ".html"}>
                    {/* uploads folder is the same level of app folder */}
                    <img className="card-img-top" src={this.state.API_URL + "uploads/" + this.props.s_image} alt={this.props.s_image}/></Link>
            </div>
    
        {/* Title va cac thong tin quan trong header */}
            <div className="float-left">
                <div>
                    <Link to={"/tradedetail/" + this.chuyenDoiURL(this.props.title) + "." + this.props.tradeId + ".html"}>{this.props.title + " on " + this.props.timeframe + " timeframe."}</Link>
                </div>
                <div>
                    <b className=" float-right" style={{color: this.translateBuyShort(this.props.buyshort)[1]}}>
                        {this.translateBuyShort(this.props.buyshort)[0]}
                        <i className=" float-right">
                            {'=> In/Out: ' + this.props.entrypoint + '/ ' + this.props.exitpoint}
                        </i>
                    </b>
                </div>
                <hr></hr>
                <h5>
                    <div >Created by: {this.props.createdby}.</div>
                    <div >Created date: {this.props.createdAt}.</div>
                    <div >Last updated: {this.props.updatedAt}.</div>
                </h5>
                <br></br>
                <div>Time frame: {this.props.timeframe}.</div>
                <div>Stok code: {this.props.symbolcode}. Quantity: {this.props.qty}</div>
                <div><b className=" float-left" style={{color: this.translateBuyShort(this.props.buyshort)[1]}}>
                        {this.translateBuyShort(this.props.buyshort)[0]}</b>
                </div>
                <div>: Entry point: {this.props.entrypoint}. Exit point {this.props.exitpoint} 👍</div>
                <div>👉 Stochastic: <b style={{color: this.translateIndicatorColor(this.props.stocolor)}}> {this.translateIndicatorColor(this.props.stocolor)} </b> </div>
                <div>👉 RSI       : <b style={{color: this.translateIndicatorColor(this.props.rsicolor)}}> {this.translateIndicatorColor(this.props.rsicolor)} </b> </div>
                <div>👉 MACD      : <b style={{color: this.translateIndicatorColor(this.props.macdcolor)}}> {this.translateIndicatorColor(this.props.macdcolor)} </b> </div>
                <div>👉 MACD HTF  : <b style={{color: this.translateIndicatorColor(this.props.macd_htf)}}> {this.translateIndicatorColor(this.props.macd_htf)} </b> </div>
                
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
  
export default connect(mapStateToProps, null)(Trade);
//import { connect } from 'react-redux';
// export default Trade;