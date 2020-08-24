import React, { Component } from 'react';
import '../App.css';
import Trade from './trade.component';
import {NavLink, Link  } from "react-router-dom";
import dailystockDataService from "../services/dailystock.service";
import Pagination from 'pagination-component';
import { connect } from 'react-redux';
import queryString from 'query-string';
import myUtility from "../utils/utility";

class tradingList extends Component {
  constructor(props) {
    super(props);
    
    let url = this.props.location.search;
    let params = queryString.parse(url);

    this.state = {
      masterSymbols: [],
      topFive: 5,   // lay 5 symbol hot nhat
      data:null ,
      title:'' ,
      timeframe:'3 min',
      createddate:'',
      symbolcode:'',
      buyshort:'1',
      qty:'100',
      entrypoint:'0',
      exitpoint:'0',
      stocolor:'1',
      rsicolor:'1',
      macdcolor:'1',
      macd_htf:'1',
      b_image: null,
      s_image: null,
      createdby:'',
      selectedFile:'',
      showForm: false,
      showAddButton: true,
      currentuser:'',
      selectedBigFile:'',
      addclosebutton:'Add New Record',
      showButton:false,
      postsPerPage:15,
      totalPages: 1,
      currentPage: 1,
      currentTransaction: null,  // currentUser
      currentIndex: -1,  // phan tu dau tien trong list duoc selected
      searchKeyword: params.searchKeyword
    }
    this.onClick = this.onClick.bind(this);
    this.fileBigSelectedHandler = this.fileBigSelectedHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.isChange = this.isChange.bind(this);
    
  }
  
  onChangeCurrentPage(i) {
    console.log('i la : ' + i);
    this.setState({
      currentPage: i+1
    })

    console.log('trang thu chinh xac :  ' + this.state.currentPage + ' hay la i+1 ' + (i+1));
    this.retrieveTransactions((i+1),this.state.searchKeyword);
    
  }

  retrieveNotMasterCategories() {
    dailystockDataService.getAllSymbol()
      .then(response => {
        this.setState({
          masterSymbols: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  componentWillMount() {
    console.log('props ' + JSON.stringify(this.props.match));
    // const keyword = this.props.params.searchKeyword
    // if (this.state.params.searchKeyword) {
    //   this.setState({
    //     searchKeyword: this.state.params.searchKeyword
    //   }) 
    // }
    // let url = this.props.location.search;
    // let params = queryString.parse(url);
    // let keyword = params.searchKeyword
    // if (keyword) {
    //   this.setState({
    //     searchKeyword: keyword
    //   })
    // }
    this.retrieveTransactions(this.state.currentPage,this.state.searchKeyword);
    this.retrieveNotMasterCategories();

   
      // const cu = localStorage.getItem('user');
      // if(cu !== null) {
      //   this.setState({
      //     currentuser: localStorage.getItem('user'),
      //     createdby: localStorage.getItem('user'),
      //     showAddButton: true,
      //   })
      //   console.log('C-U trong trading list:  ' + this.state.createdby);
      // }

    // if(this.state.data === null ){
    //   getProductData().then((res)=>{
    //     //console.log('res la gi  ' + res); // la data object
    //     this.setState({
    //       data:res
    //     });
    //   })
    // }

  }

  onChangesearchKeyword(e) {
    const searchKeyword = e.target.value;

    this.setState({
      searchKeyword: searchKeyword
    });
  }

  retrieveTransactions(currentPage, keyword) {
    console.log('key ' + this.state.searchKeyword);
    dailystockDataService.getAll(currentPage,keyword)
      .then(response => {
        this.setState({
          data: response.data.data,
          totalPages: response.data.pages
        });
        console.log(response.data);
        console.log('ket qua total pages' + response.data.pages);
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  onClick () {
      this.setState({showForm: !this.state.showForm})
      console.log('form ' + this.state.showForm);
      if(this.state.addclosebutton === "Add New Record") {
        this.setState({addclosebutton: "Close"})
      } else {
        this.setState({addclosebutton: "Add New Record"})
      }
  }

renderAddButton = () => {
  return (
    <div className="card border-primary mb-3 mt-2">
        <p className="card-body"><button onClick={ this.onClick } className="btn btn-block btn-primary">{this.state.addclosebutton}</button></p>
        {/* We want to show the form if the state is true */}
        {this.state.showForm && this.renderAddForm()}
    </div>
  )
}

renderAddForm = () => {
 
  return (
    <div >
        <form className="card-body jumbotron card-border">
            <div className="form-group">
                <input onChange={(event)=> this.isChange(event)} type="text" className="form-control" name="title" id="title" aria-describedby="name_text" value={this.state.title} placeholder="Enter Title" />
            </div>
            <div className="form-inline">
                <div className="form-group">
                  <label for="entry">Symbol: </label>
                  <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="symbolcode" id="symbolcode" aria-describedby="name_text" placeholder="Enter stock symbolcode"/>
                </div>
                <div className="form-group">
                <label for="entry">Qty: </label>
                  <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="qty" id="qty" aria-describedby="name_text" placeholder="Enter Quantiy" value={this.state.qty}/>
                </div>
            </div>
            
            <div className="form-group">
                <div className="form-check-inline">
                      <label className="form-label"><strong>Action:</strong>
                      <input onChange={(event)=> this.isActionChange(event)} value="1" type="radio" className="form-check-input" name="buyshort" defaultChecked="1" />BUY
                      <input onChange={(event)=> this.isActionChange(event)} value="2" type="radio" className="form-check-input" name="buyshort" />SHORT
                      </label>
                </div>
            </div>

            <div className="form-inline ">
                <div className="form-group">
                  <label for="entry">Entry: </label>
                  <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="entrypoint" id="entrypoint" aria-describedby="name_text" placeholder="Entry price" />
                </div>
                <div className="form-group">
                  <label for="exit">Exit: </label>
                  <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="exitpoint" id="exitpoint" aria-describedby="name_text" placeholder="Exit price" />
                </div>
            </div>

            <div class="form-group">
                Select time frame:
                <select id="timeframe" name="timeframe" onChange={(event)=> this.isChange(event)} >
                    {/* <option >Select Timeframe</option> */}
                    <option selected={this.state.timeframe === "3 min"} value="5 min">3 min</option>
                    <option selected={this.state.timeframe === "5 min"} value="5 min">5 min</option>
                    <option selected={this.state.timeframe === "15 min"} value="15 min">15 min</option>
                    <option value="1 D">1 D</option>
                </select>
            </div>

            <div className="col">
                <div className="row">
                  <div className="form-check-inline">
                      <label className="label">Stochastic: 
                      <input color="red" onChange={(event)=> this.isChange(event)} checked={this.state.stocolor === "1"} value="1" type="radio" className="label" name="stocolor"/>Green
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.stocolor === "2"} value="2" type="radio" className="label" name="stocolor" />Red
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.stocolor === "3"} value="3" type="radio" className="label" name="stocolor" />None
                      </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-check-inline">
                      <label className="label">RSI: 
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.rsicolor === "1"} value="1" type="radio" className="label" name="rsicolor" />Green
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.rsicolor === "2"} value="2" type="radio" className="label" name="rsicolor" />Red
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.rsicolor === "3"} value="3" type="radio" className="label" name="rsicolor" />None
                      </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-check-inline">
                      <label className="label">MACD: 
                      <input color="Green" onChange={(event)=> this.isChange(event)} checked={this.state.macdcolor === "1"} value="1" type="radio" className="radio" name="macdcolor"/>Green
                      <input color="red" onChange={(event)=> this.isChange(event)} checked={this.state.macdcolor === "2"} value="2" type="radio" className="radio" name="macdcolor" />Red
                      <input color="black" onChange={(event)=> this.isChange(event)} checked={this.state.macdcolor === "3"} value="3" type="radio" className="radio" name="macdcolor" />None
                      </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-check-inline">
                      <label className="label">Macd HTF: 
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.macd_htf === "1"} value="1" type="radio" className="label" name="macd_htf"/>Green
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.macd_htf === "2"} value="2" type="radio" className="label" name="macd_htf" />Red
                      <input onChange={(event)=> this.isChange(event)} checked={this.state.macd_htf === "3"} value="3" type="radio" className="label" name="macd_htf" />None
                      </label>
                  </div>
                </div>
                  
            </div>

            <div className="form-group">
                <label>Small image
                <input className="s_image" type="file" onChange={(e) => this.fileSelectedHandler(e)}></input>
                </label>
                <label>Big image
                <input className="b_image" type="file" onChange={(e) => this.fileBigSelectedHandler(e)}></input>
                </label>
            </div>
            <div className="card-header">
              <button type="reset" onClick={(e) => this.addTransaction(e)} className="btn btn-block btn-info">Save Trade Information</button>
            </div>

        </form>
        
    </div>
  )
    
}
  
  printData = () => {
    console.log('vo print data trading list ' + JSON.stringify(this.state.data));
      if(this.state.data !== null){
       return  this.state.data.map((value,key)=> 
           (<Trade
           key={key}
           tradeId={value.id}
           title={value.title}
           createddate={value.createddate}
           timeframe={value.timeframe}
           symbolcode={value.symbolcode}
           qty={value.qty}
           entrypoint={value.entrypoint}
           exitpoint={value.exitpoint}
           buyshort={value.buyshort}
           stocolor={value.stocolor}
           rsicolor={value.rsicolor}
           macdcolor={value.macdcolor}
           macd_htf={value.macd_htf}
           b_image={value.b_image}
           s_image={value.s_image}
           createdby={value.createdby}   />)
        )
      }
  }
  
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
        [name]:value
    });
    console.log('doi tuong : ' + name);
    console.log('gia tri : ' + value);
    
  }

  isActionChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    //console.log('doi tuong : ' + name);
    //console.log('gia tri : ' + value);
    
    this.setState({
        [name]:value
    });

    if(value == 1) {
        // BUY action
        this.setState({
          stocolor: '1',
          rsicolor: '1',
          macdcolor: '1',
          macd_htf: '1'
        })
    } else {
        // SHORT action
        this.setState({
          stocolor: '2',
          rsicolor: '2',
          macdcolor: '2',
          macd_htf: '2'
      })
    }
    
    
  }

  fileSelectedHandler = event => {
    const s_image = event.target.files[0].name

    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng
    // khi ADD thi khac: lam chung trong setState
    this.setState({
      selectedFile: event.target.files[0],
      s_image: "../uploads/" + s_image   // khong hieu sao o day khong xai event.target duoc
    })
  }

  
  fileBigSelectedHandler = event => {
    const b_image = event.target.files[0].name
    this.setState({
      selectedBigFile: event.target.files[0],
      b_image: "../uploads/" + b_image
    })
    console.log('b ' + this.state.selectedBigFile);
  }  

  addTransaction = () => {    
      console.log('handleCilck ADD here');
      console.log('ten file nho ' + this.state.s_image);
      console.log('ten file lon ' + this.state.b_image);
      var ss_image = null;
      var bb_image = null;

      if (this.state.b_image == null) {
        console.log('bbbbbbbbbbbbbbbbbb');
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // datee = (today.getMonth() + 1).toString + today.getDate().toString + today.getFullYear().toString;
        bb_image = '..uploads/' + this.state.symbolcode + '-' + date
      }
      if (this.state.s_image == null) {
        console.log('sssssssssssssssssss');
          ss_image = '../uploads/commingsoon.jpg'
      }
      console.log('ten file nho 2' + this.state.s_image);
      console.log('ten file lon ' + this.state.b_image);
  
      // Xu ly add du lieu vao db
      var {title,createddate,timeframe,symbolcode,qty,entrypoint,exitpoint,buyshort,stocolor,rsicolor,macdcolor,macd_htf,b_image,s_image,createdby} = this.state;
      // var dataTemp = [];      
      var data = {
        title: title,
        createddate: createddate,
        timeframe: timeframe,
        symbolcode: symbolcode,
        qty: qty,
        entrypoint: entrypoint,
        exitpoint: exitpoint,
        buyshort: buyshort,
        stocolor: stocolor,
        rsicolor: rsicolor,
        macdcolor: macdcolor,
        macd_htf: macd_htf,
        b_image: b_image === null? bb_image:b_image,
        s_image: s_image === null? ss_image:s_image,
        createdby: createdby
      };
    
        dailystockDataService.create(data)
          .then(response => {
            // this.setState({
            //   id: response.data.id,
            //   user: response.data.user,
            //   avatar: response.data.avatar,
            //   email: response.data.email,
            //   password: response.data.password,
            //   isadmin: response.data.isadmin,
            //   submitted: true
            // });
            console.log('new transaction : ' + JSON.stringify(response.data));
            this.setState({
              message: "New transction has just created sucessfully!",
            })
    
          // Xu ly tiep phan upload file
          myUtility.uploadFiles("upfileUploads", this.state.selectedFile);
          myUtility.uploadFiles("upfileUploads", this.state.selectedBigFile);
    
    
          })
          .catch(e => {
            console.log(e);
          });
      
  }

  render() {
    
    return (
      <div>
          <header className="masthead">
            <div className="col-lg-12 my-auto">
                <div className="header-content mx-auto">
                    <h1>Trading Records</h1>
                </div>
            </div>
          </header>
      
              {/* <div className="col-xs-8"> */}
                  {/* We want to show the form if the state is true */}
                  {this.state.showAddButton && this.renderAddButton()}
              {/* </div> */}
                
                
              {/* Bat dau phan trading list chinh */}
              <div className="container-fluid col-12">
                  <div className="row">
                    <div className="card border-secondary mb-3 mt-2 col-2">
                      <div>
                      <ul className="list-item">
                          <li>
                            <a href={'/dailystocks/1?searchKeyword='}>ALL symbols</a>
                          </li>
                          {this.state.masterSymbols.reverse().map((mastercategory) => 
                          <li>
                            <a href={'/dailystocks/1?searchKeyword='+ mastercategory.symbolcode}>{mastercategory.symbolcode + " (" + mastercategory.DemNguoc + ")"}</a>
                          </li>
                          )}
                      </ul>

                        
                      </div>
                    </div>

                    <div className="card border-primary mb-3 mt-2 col-10">
                      <div className="col-10">
                        <div className="row">
                            <div className="col-divide-header">
                              <a href={'/dailystocks/1?searchKeyword='}>ALL </a> or Top 5:
                            </div>
                           
                            <div className="col-divide">
                                {this.state.masterSymbols.slice(0,this.state.topFive).map((masterFive) => 
                                    <a href={'/dailystocks/1?searchKeyword='+ masterFive.symbolcode}>{masterFive.symbolcode + "  "}</a>
                                  )}
                            </div>                            

                        </div>
                      </div>
  
                            {this.printData()}
                    </div>
                    {/* Ket thuc phan trading list chinh */}
                  </div>
              </div>

              <div className="header col">
              <Pagination 
                  currentPage={this.state.currentPage-1}
                  pageCount={this.state.totalPages}
                  pageLinkClassName="page-link"
                  currentLinkClassName="current-link"
                  onPageClick={i => {
                    console.log(`Link to page ${i} was clicked.`);
                    this.onChangeCurrentPage(i);
                  }} />

              currentPage: {this.state.currentPage} / pageCount: {this.state.totalPages}
              {/* <li>pageLinkClassName: "page-link"</li>
              <li>currentLinkClassName="current-link"</li> */}
          </div>

      </div>
  
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong user List ' + JSON.stringify(state.userSignin.userInfo));
  
  return {
      currUser: state.userSignin.userInfo
  }
}
export default connect(mapStateToProps, null)(tradingList);


