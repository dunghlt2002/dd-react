import React, { Component } from "react";
import dailystockDataService from "../services/dailystock.service";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import myUtility from "../utils/utility";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.fileBigSelectedHandler = this.fileBigSelectedHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.isChange = this.isChange.bind(this);
    this.saveDailyStock = this.saveDailyStock.bind(this);
    this.newDailyStock = this.newDailyStock.bind(this);

    this.state = {
      id: null,
      data:null ,
      title:'Go LONG ' ,
      timeframe:'3 min',
      // createddate:'',
      symbolcode:'',
      buyshort: null,
      qty:'100',
      entrypoint:'0',
      exitpoint:'0',
      stocolor:'1',
      rsicolor:'1',
      macdcolor:'1',
      macd_htf:'1',
      b_image: null,
      s_image: null,
      createdby: '',
      selectedFile: null,
      selectedBigFile:'',
      submitted: false,
      // avatar: "../avatars/commingsoon.jpg",
      message: ""
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  
  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
        [name]:value
    });
    if (name === "symbolcode") {
      this.setState({
        title: value
      });
    }
    
    if (name === "entrypoint") {
      this.setState({
        title: myUtility.translateBuyShort(this.state.buyshort)[0] + " " + this.state.symbolcode + " at: " + value
      });
    }
    console.log('doi tuong : ' + name);
    console.log('gia tri : ' + value);
    
  }

  isActionChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    
    this.setState({
        [name]:value
    });

    if(value == 1) {
        // BUY action
        this.setState({
          title: "Buy " + this.state.symbolcode + " at " + this.state.entrypoint,
          stocolor: '1',
          rsicolor: '1',
          macdcolor: '1',
          macd_htf: '1'
        })
    } else {
        // SHORT action
        this.setState({
          title: "Short " + this.state.symbolcode + " at " + this.state.entrypoint,
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


  saveDailyStock() {
    console.log('vo daily transaction SAVE ');

    //Xu ly vu dat ten file chart small BIG neu user khong upload
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
    console.log('ten file lon ' + this.props.currUser.userInfo.user);

          // Xu ly add du lieu vao db
          var {title,createddate,timeframe,symbolcode,qty,entrypoint,exitpoint,buyshort,stocolor,rsicolor,macdcolor,macd_htf,b_image,s_image,createdby} = this.state;
          var data = {
            title: title,
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
            createdAt: Date(),
            updatedAt: null,
            createdby: this.props.currUser.userInfo.user
          };
    
    dailystockDataService.create(data)
      .then(response => {
        this.setState({
          // id: response.data.id,
          // user: response.data.user,
          // avatar: response.data.avatar,
          // email: response.data.email,
          // password: response.data.password,
          // isadmin: response.data.isadmin,
          submitted: true
        });
        console.log('new transaction : ' + JSON.stringify(response.data));
        this.setState({
          message: "New daily stock transaction: " + data.title + " has just created sucessfully!",
        })

        // Xu ly tiep phan upload file
        myUtility.uploadFiles("upfileUploads", this.state.selectedFile);
        myUtility.uploadFiles("upfileUploads", this.state.selectedBigFile);

      })
      .catch(e => {
        console.log(e);
      });
  }

  newDailyStock() {
    // set up san gia tri cho new user tiep
    this.setState({
      title:'Go LONG ' ,
      timeframe:'3 min',
      createddate:'',
      symbolcode:'',
      buyshort: null,
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
      selectedFile: null,
      selectedBigFile:null,
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-container">
            <h4>You submitted successfully!</h4>


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
              <button className="btn-block btn-primary" onClick={this.newDailyStock}>
                Add New Daily Stock Transaction
              </button>
                  : null ) : <Link to="signin">Sign-in here</Link>
              }
            <a href="/dailystocks/1?searchKeyword=">Trading List  ... </a>
            <Link to="/dailystocks/1?searchKeyword=" >Link to Trading List</Link>
          </div>
        ) : (
          <div className="form-container-big">
            <li>
              <h2>Add New Daily Stock Transaction</h2>
            </li>
            {/* <li className="form-group">
              <label htmlFor="user">Users name</label>
              <input
                type="text"
                className="form-control"
                id="user"
                required
                value={this.state.user}
                onChange={this.onChangeUser}
                name="user"
              />
            </li> */}

            
            {/* <li className="form-group">
              <label htmlFor="products_price">Avatar</label>
              <input className="avatarfile" type="file" onChange={this.fileSelectedHandler}></input>
              <input
                type="text"
                className="form-control"
                id="products_image"
                value={this.state.avatar}
                onChange={this.onChangepAvatar}
              />
            </li>
            */}

                  <div className="form-inline">
                      <div className="form-group">
                        <label htmlFor="entry">Symbol: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="symbolcode" id="symbolcode" aria-describedby="name_text" placeholder="Enter stock symbolcode"/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="entry">Qty: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="qty" id="qty" aria-describedby="name_text" placeholder="Enter Quantiy" value={this.state.qty}/>
                      </div>
                  </div>
                  
                  <div className="form-inline">
                      <div className="form-group">
                        <label htmlFor="entry">Entry: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="entrypoint" id="entrypoint" aria-describedby="name_text" placeholder="Entry price" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exit">Exit: </label>
                        <input onChange={(event)=> this.isChange(event)} type="text" className="form-inline" name="exitpoint" id="exitpoint" aria-describedby="name_text" placeholder="Exit price" />
                      </div>
                  </div>

                  <div className="form-group">
                      <div className="form-check-inline">
                            <label className="form-label"><strong>Action:</strong>
                            {/* defaultChecked="1"  */}
                            <input onChange={(event)=> this.isActionChange(event)} value="1" type="radio" className="form-check-input" name="buyshort" />BUY
                            <input onChange={(event)=> this.isActionChange(event)} value="2" type="radio" className="form-check-input" name="buyshort" />SHORT
                            </label>
                      </div>
                  </div>

                  <div className="form group">
                      <input onChange={(event)=> this.isChange(event)} type="text" className="form-control" name="title" id="title" aria-describedby="name_text" value={this.state.title} placeholder="Enter Title" />
                  </div>


                  <div className="form-group">
                      Select time frame:
                      <select id="timeframe" name="timeframe" onChange={(event)=> this.isChange(event)} >
                          {/* <option >Select Timeframe</option> */}
                          <option defaultValue={this.state.timeframe === "3 min"} value="3 min">3 min</option>
                          <option defaultValue={this.state.timeframe === "5 min"} value="5 min">5 min</option>
                          <option defaultValue={this.state.timeframe === "15 min"} value="15 min">15 min</option>
                          <option defaultValue={this.state.timeframe === "1 D"} value="1 D">1 D</option>
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


            <button onClick={this.saveDailyStock} className="btn btn-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong App.js ' + JSON.stringify(state.userSignin));
  
  return {
      // currUser: state.userSignin.userInfo  //8/3 tam doi ve userSignin
      currUser: state.userSignin
  }
}


export default connect(mapStateToProps, null)(AddUser);