import React, { Component } from 'react';
import dailystockDataService from "../services/dailystock.service";
import {NavLink, Link  } from "react-router-dom";

class TradeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            API_URL: process.env.REACT_APP_URL,
            currentTrade:null ,
            title:'',
            timeframe:'',
            symbolcode:'',
            qty:'',
            entrypoint:'',
            exitpoint:'',
            buyshort:'',
            stocolor:'',
            rsicolor:'',
            macdcolor:'',
            macd_htf:'',
            s_image:''
        }
        }
      
    componentDidMount() {
        console.log('param  :' + parseInt(this.props.match.params.id));   // co param id roi
        this.getTradeData(parseInt(this.props.match.params.id));
        if(this.state.currentTrade === null ){
            // this.getTradeData(parseInt(this.props.match.params.id));
        //     getTradeData(parseInt(this.props.match.params.id)).then((res)=>{
        //         //console.log('vo day roi  ' + res);
        //     this.setState({
        //       data:res
        //     });
        //     //console.log('vo day roi lay data xem ' + this.state.data);    // co data roi
        //   })
        }
    }

    getTradeData(id) {
        console.log('user id trg getTradeData: ' + id);
        dailystockDataService.get(id)
          .then(response => {
            this.setState({
                currentTrade: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
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

    printData = () => {
        if(this.state.currentTrade !== null){
         return (
           
            <div className="container">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <div className="card border-primary mb-3 mt-2">
                        <div className="card-header"><h3>{this.state.currentTrade.title}</h3>
                            <div>
                                <a href="/dailystocks/1?searchKeyword=">Trading List  ... </a>
                                <Link to="/dailystocks/1?searchKeyword=" >Link to Trading List</Link>
                            </div>
                            <div className="card-body text-primary">
                                <div className="row">
                                    
                                    <div className="col">
                                        <div>Date: {this.state.currentTrade.createdAt}. Time frame: {this.state.currentTrade.timeframe}.</div>
                                        <div>Stok code: {this.state.currentTrade.symbolcode}. Quantity: {this.state.currentTrade.qty}</div>
                                        <div><b className=" float-left" style={{color: this.translateBuyShort(this.state.currentTrade.buyshort)[1]}}>
                                                {this.translateBuyShort(this.state.currentTrade.buyshort)[0]}</b>
                                        </div>
                                        <div>: Entry point: {this.state.currentTrade.entrypoint}. Exit point {this.state.currentTrade.exitpoint} 👍</div>
                                        <div>👉 Stochastic: <b style={{color: this.translateIndicatorColor(this.state.currentTrade.stocolor)}}> {this.translateIndicatorColor(this.state.currentTrade.stocolor)} </b> </div>
                                        <div>👉 RSI       : <b style={{color: this.translateIndicatorColor(this.state.currentTrade.rsicolor)}}> {this.translateIndicatorColor(this.state.currentTrade.rsicolor)} </b> </div>
                                        <div>👉 MACD      : <b style={{color: this.translateIndicatorColor(this.state.currentTrade.macdcolor)}}> {this.translateIndicatorColor(this.state.currentTrade.macdcolor)} </b> </div>
                                        <div>👉 MACD HTF  : <b style={{color: this.translateIndicatorColor(this.state.currentTrade.macd_htf)}}> {this.translateIndicatorColor(this.state.currentTrade.macd_htf)} </b> </div>
                                    </div>
                                    <div className="col-3">
                                        {/* https://dd-dailystock-node.herokuapp.com/ */}
                                        <img width="80%" src={this.state.API_URL + "uploads/" + this.state.currentTrade.s_image} className="img"  alt="" />
                                        {/* <img width="80%" src={"http://localhost:8080/uploads/" + this.state.currentTrade.s_image} className="img"  alt="" /> */}
                                    </div>
                                </div>
                                <br></br>
                                <img width="100%" src={this.state.API_URL + "uploads/" + this.state.currentTrade.b_image} className="img"  alt="" />

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

export default TradeDetail;