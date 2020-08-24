import React, { Component } from 'react';
import axios from "axios";
import dailystockDataService from "../services/dailystock.service";
import myUtility from "../utils/utility";
import {NavLink, Link  } from "react-router-dom";

class EditTrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrade: {} ,
            showForm: false,
            showAddButton: false,
            showEditButton: false,
            showDeleteButton: false,
            selectedFile: null,
            selectedBigFile: null,
            myTag: ''
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeSymbolcode = this.onChangeSymbolcode.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangeEntryPoint = this.onChangeEntryPoint.bind(this);
        this.onChangeExitPoint = this.onChangeExitPoint.bind(this);
        this.onChangeStocolor = this.onChangeStocolor.bind(this);
        this.onChangeRsicolor = this.onChangeRsicolor.bind(this);
        this.onChangeMacdcolor = this.onChangeMacdcolor.bind(this);
        this.onChangeMacd_htfcolor = this.onChangeMacd_htfcolor.bind(this);
        this.onChangeBuyShort = this.onChangeBuyShort.bind(this);
        this.onChangeTimeframe = this.onChangeTimeframe.bind(this);
        this.onChangeS_image = this.onChangeS_image.bind(this);
        this.onChangeB_image = this.onChangeB_image.bind(this);
        this.fileBigSelectedHandler = this.fileBigSelectedHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        
    }
    
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        console.log('EDIT TRADE param  :' + parseInt(this.props.match.params.id));   // co param id roi
        this.getTradeData(parseInt(this.props.match.params.id));
    }

    getTradeData(id) {
        console.log('transaction id trg edit Trade: ' + id);
        dailystockDataService.get(id)
          .then(response => {
            this.setState({
                currentTrade: response.data
            });
            console.log(response.data);
            console.log('this state currentTrade ' + this.state.currentTrade);
          })
          .catch(e => {
            console.log(e);
          });
    }

    backToTradingList (){
      const redirect = this.props.location.search ? this.props.location.search.split("=")[1] : '/'
      this.props.history.push("/dailystocks/1?searchKeyword=");
    }

    updateTrade() {
      dailystockDataService.update(
        this.state.currentTrade.id,
        this.state.currentTrade
      )
      .then(response => {
        // Sequelize xong
        console.log('Transaction updated ' + response.data);
        this.setState({
          message: "Transaction was updated successfully!"
        });

            // Xu ly tiep phan upload file
            myUtility.uploadFiles("upfileUploads", this.state.selectedFile);
            myUtility.uploadFiles("upfileUploads", this.state.selectedBigFile);
      })
      .catch(e => {
        console.log(e);
      });
  }

  fileSelectedHandler = event => {
    const s_image = event.target.files[0].name
    const s_imageFile = event.target.files[0]
    // console.log('e target file ' + event.target.files[0]);
    // console.log('file SMALL selected handler ' + event.target.files[0].name);

    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng
    this.setState({
      selectedFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentTrade: {
          ...prevState.currentTrade,
          s_image: "../uploads/" + s_image,   // khong hieu sao o day khong xai event.target duoc
        }
      };
    });
    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng
  }

  
  fileBigSelectedHandler = event => {
    const b_image = event.target.files[0].name
    this.setState({
      selectedBigFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentTrade: {
          ...prevState.currentTrade,
          b_image: "../uploads/" + b_image,
        }
      };
    });
  }

    onChangeS_image(e) {
        const s_image = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                s_image: s_image
              }
            };
        });
    }

    onChangeB_image(e) {
        const b_image = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                b_image: b_image
              }
            };
        });
    }

    onChangeBuyShort(e) {
        const buyshort = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                buyshort: buyshort
              }
            };
        });
    }
    
    onChangeStocolor(e) {
        const stocolor = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                stocolor: stocolor
              }
            };
        });
    }

    onChangeRsicolor(e) {
        const rsicolor = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                rsicolor: rsicolor
              }
            };
        });
    }

    onChangeMacdcolor(e) {
        const macdcolor = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                macdcolor: macdcolor
              }
            };
        });
    }

    onChangeMacd_htfcolor(e) {
        const macd_htf = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                macd_htf: macd_htf
              }
            };
        });
    }

    onChangeTimeframe(e) {
        const timeframe = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                timeframe: timeframe
              }
            };
        });
    }

    onChangeQty(e) {
        const qty = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                qty: qty
              }
            };
        });
    }

    onChangeEntryPoint(e) {
        const entrypoint = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                entrypoint: entrypoint
              }
            };
        });
    }
    
    onChangeExitPoint(e) {
        const exitpoint = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                exitpoint: exitpoint
              }
            };
        });
    }

    onChangeSymbolcode(e) {
        const symbolcode = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                symbolcode: symbolcode
              }
            };
        });
    }

    onChangeTitle(e) {
        const title = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                title: title
              }
            };
        });
    }

    onChangeEmail(e) {
        const email = e.target.value
        this.setState(function(prevState) {
            return {
              currentTrade: {
                ...prevState.currentTrade,
                email: email
              }
            };
        });
    }

    translateIndicatorColor = (color) =>
    {
        var strColor = '';
        if (color === "1") {
            strColor = " Green"
        } else if (color === "2") {
            strColor = "Red"
        } else {
            strColor = "Black"
        }
        
        return strColor

    }

        
    translateBuyShort = (color) =>
    {
        var strBSColor = [];
        if (color === 1) {
            strBSColor = ["Buy","Green"]
        } else if (color === 2) {
            strBSColor = ["Short","Red"]
        }
        
        return strBSColor

    }

render() {
    const { currentTrade } = this.state

    return (
    <div className="card border-primary mb-3 mt-2">
        <div className="card-header"><h2>Edit transaction: {this.state.currentTrade.title}</h2>
            {this.state.loading && <div>Loading...</div>}
            {this.state.error && <div>{this.state.error}</div>}
            {this.state.message && <div>{this.state.message}</div>}
            <div>
              <a href="/dailystocks/1?searchKeyword=">Trading List  ... </a>
              <Link to="/dailystocks/1?searchKeyword=" >Link to Trading List</Link>
            </div>
            <div className="card-body text-primary">
                <div className="row">
                    <div className="col">
                                <div className="form-group">
                                <div className="">Title</div>
                                    <input type="text" name="title" className="form-control" value={currentTrade.title} onChange={e => this.onChangeTitle(e)}/>
                                </div>

                                <div className="form-group">Time frame:
                                    <select id="timeframe" name="modal-body" onChange={e => this.onChangeTimeframe(e)} >
                                        {/* <option >Select Timeframe</option> */}
                                        <option selected={currentTrade.timeframe === "5 min"} value="5 min" onChange={e => this.onChangeTimeframe(e)}>5 min</option>
                                        <option selected={currentTrade.timeframe === "15 min"} value="15 min" onChange={e => this.onChangeTimeframe(e)}>15 min</option>
                                        <option selected={currentTrade.timeframe === "1 D"} value="1 D" onChange={e => this.onChangeTimeframe(e)}>1 D</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <div className="">Symbol/ Quantity</div>
                                    <input type="text" className="form-check-in" value={currentTrade.symbolcode} name="symbolcode" onChange={e => this.onChangeSymbolcode(e)}/>
                                    <input type="text" className="form-check-in" value={currentTrade.qty} name="qty" onChange={e => this.onChangeQty(e)}/>units
                                </div>

                                <div className="form-group">
                                    <div className="">Entry/ Exit point</div>
                                    <input type="text" className="form-check-in" value={currentTrade.entrypoint} onChange={e => this.onChangeEntryPoint(e)}/>
                                    <input type="text" className="form-check-in" value={currentTrade.exitpoint}  onChange={e => this.onChangeExitPoint(e)}/>
                                </div>

                                <div className="form-group" style={{color: this.translateBuyShort(currentTrade.buyshort)[1]}} >Action: {currentTrade.buyshort}
                                    <div className="form-check-inline">
                                        <label className="label">
                                            <input type="radio" value="1" checked={currentTrade.buyshort === "1"}
                                            onChange={e => this.onChangeBuyShort(e)}/>Buy
                                        </label>
                                        <label className="label">
                                            <input type="radio" value="2" checked={currentTrade.buyshort === "2"}
                                            onChange={e => this.onChangeBuyShort(e)}/>Short
                                        </label>
                                    </div>
                                </div>

                                {/* Bat dau phan radio button cua 4 indicators */}

                                <div style={{color: this.translateIndicatorColor(currentTrade.stocolor)}} className="label">Stochastic: {currentTrade.stocolor}
                                    <label className="label">
                                        <input type="radio" value="1" checked={currentTrade.stocolor === "1"}
                                        onChange={e => this.onChangeStocolor(e)}/>Green
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="2" checked={currentTrade.stocolor === "2"}
                                        onChange={e => this.onChangeStocolor(e)} />Red
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="3" checked={currentTrade.stocolor === "3"}
                                        onChange={e => this.onChangeStocolor(e)}/>None
                                    </label>
                                </div>

                                <div style={{color: this.translateIndicatorColor(currentTrade.rsicolor)}} className="label">RSI: {currentTrade.rsicolor}
                                    <label className="label">
                                        <input type="radio" value="1" checked={currentTrade.rsicolor === "1"}
                                        onChange={e => this.onChangeRsicolor(e)}/>Green
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="2" checked={currentTrade.rsicolor === "2"}
                                        onChange={e => this.onChangeRsicolor(e)} />Red
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="3" checked={currentTrade.rsicolor === "3"}
                                        onChange={e => this.onChangeRsicolor(e)}/>None
                                    </label>
                                </div>

                                <div style={{color: this.translateIndicatorColor(currentTrade.macdcolor)}} className="label">MACD on {currentTrade.timeframe}: {currentTrade.macdcolor}
                                    <label className="label">
                                        <input type="radio" value="1" checked={currentTrade.macdcolor === "1"}
                                        onChange={e => this.onChangeMacdcolor(e)}/>Green
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="2" checked={currentTrade.macdcolor === "2"}
                                        onChange={e => this.onChangeMacdcolor(e)} />Red
                                    </label>
                                    <label className="label">
                                        <input type="radio" value="3" checked={currentTrade.macdcolor === "3"}
                                        onChange={e => this.onChangeMacdcolor(e)}/>None
                                    </label>
                                </div>
                                
                                <div style={{color: this.translateIndicatorColor(currentTrade.macd_htf)}} className="label">MACD on HTF: {currentTrade.macd_htf}
                                      <label className="label">
                                          <input type="radio" value="1" checked={currentTrade.macd_htf === "1"}
                                          onChange={e => this.onChangeMacd_htfcolor(e)}/>Green
                                      </label>
                                      <label className="label">
                                          <input type="radio" value="2" checked={currentTrade.macd_htf === "2"}
                                          onChange={e => this.onChangeMacd_htfcolor(e)} />Red
                                      </label>
                                      <label className="label">
                                          <input type="radio" value="3" checked={currentTrade.macd_htf === "3"}
                                          onChange={e => this.onChangeMacd_htfcolor(e)}/>None
                                      </label>
                                </div>
                                {/* Het 4 indicator radio button */}

                                <div className="form-group">Edit file name of images: 
                                    Small image:<input type="text" className="form-control-short" value={currentTrade.s_image} onChange={e => this.onChangeS_image(e)}/>
                                    <img width="30%" src={"/uploads/" + currentTrade.s_image} className="img"  alt="" />
                                    Big image:<input type="text" className="form-control-short" value={currentTrade.b_image} onChange={e => this.onChangeB_image(e)}/>
                                    <img width="80%" src={"/uploads/" + currentTrade.b_image} className="img"  alt="" />
                                </div>
                                <div className="form-group">
                                    <div>or Upload new image: 
                                      <label>Small image
                                      <input className="ns_image" type="file" onChange={(e) => this.fileSelectedHandler(e)}></input>
                                      </label>
                                      <label>Big image
                                      <input className="nb_image" type="file" onChange={(e) => this.fileBigSelectedHandler(e)}></input>
                                      </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(event) => this.updateTrade(event)}>Save Changes</button>
                                    <button onClick={(event) => this.backToTradingList(event)} type="button" className="btn btn-danger" data-dismiss="modal">Discard</button>
                                </div>

                    </div>
            
                </div>
            </div>
        </div>
    </div>
                
    )
    }
}

export default EditTrade;

