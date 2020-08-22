import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { connect } from 'react-redux';

import HomeScreen from "./components/home.component"; 
// import UsersList from "./components/user-list.component";
// import AddUser from "./components/add-user.component";
// import UserProfile from "./components/profile.component";
// import SigninScreen from "./components/signin.component";
import { userLogoutFetch } from './actions/userActions';
// import ImportCSV from "./components/import-csv.component";
import UnderConstruction from "./components/z-under-construction.component";
// import TradingList from "./components/trading-list.component";
// import TradeDetail from "./components/trade-detail.component";
// import EditTrade from "./components/edit-trade.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      password: '',
      email:''
  }
  }
  
  logoutHandler = (e) => {
    e.preventDefault();
    this.props.userLogoutFetch();
    window.location="/";    // khong biet lam sao
  }

  componentDidMount() {
    
  }

  openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  isActionChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    // console.log('doi tuong : ' + name);
    // console.log('gia tri : ' + value);
    this.setState({ 
      usvn_longtieng: value
    });
  }


  render() {

    return (
      <Router>
        <header className="header">
          <div className="brand">
            <button onClick={this.openMenu}>
                  &#9776;
            </button>
            <a href="/underconstruction/">DD Daily Stock</a>
          </div>
          <div className="header-links">

            {
              this.props.currUser.userInfo ? <Link to={"/userProfile/" + this.props.currUser.userInfo.id}>Profile: {this.props.currUser.userInfo.user}</Link> : <Link to="/signin">Sign In</Link>
            }
            {/* {userInfo && userInfo.isAdmin && ( */}
            {(
              <div className="dropdown">
                <a>
                  {this.props.currUser.userInfo ? 'Admin Menu' : null
                  }
                </a>
                <ul className="dropdown-content">
                  <li>
                    {
                      // this.getUser(this.props.currUser.userInfo.id);
                     this.props.currUser.userInfo ? <Link to={"/userProfile/" + this.props.currUser.userInfo.id}>Profile: {this.props.currUser.userInfo.user}</Link> : <Link to="/signin">Sign In</Link>
                    }
                    <Link onClick={this.logoutHandler}>Logout</Link>
                  </li>
                  <li>
                    {/* <Link to="/underconstruction">Orders List</Link> */}
                  </li>
                  {/* Phan quyen so so */}
                  { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
                    <div>
                        <li>
                          <Link to="/users">Users List</Link>
                          <Link to="/adduser">Add User</Link>
                        </li>
                        <li>
                          <Link to="/underconstruction">Add Product</Link>
                          <Link to="/underconstruction">Add Customer</Link>
                        </li>

                    </div>
                  : null ) : null
                  }

                  
                </ul>
              </div>
            )}
          </div>
        </header>
        
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={this.closeMenu}>x</button>

          <ul>
              <div>
                <label className="form-label"><strong>Long tieng:</strong>
                    <input onChange={(event)=> this.isActionChange(event)} value="0" type="radio" className="form-input" name="usvn_longtieng" defaultChecked='0' />US
                    <input onChange={(event)=> this.isActionChange(event)} value="1" type="radio" className="form-input" name="usvn_longtieng" />VN
                </label>
              </div>
          </ul>

          <ul>
            <li>
              <a href="/dailystocks/1?searchKeyword=">Trading List</a>
            </li>
            <li>
              <a href="/importcsv/">Import CSV</a>
            </li>
            <li>
              <a href="/underconstruction/">Retail Seal Box</a>
            </li>
          </ul>
        </aside>

        <div>
          <div className="container">
            <Switch>
              <Route path="/" exact={true} component={HomeScreen} />
              {/* <Route exact path={["/signin"]} component={SigninScreen} />
              <Route exact path={"/users"} component={UsersList} />
              <Route exact path={"/adduser"} component={AddUser} />
              <Route exact path={"/userProfile/:id"} component={UserProfile} />
              <Route exact path={"/importcsv"} component={ImportCSV} />
              <Route exact path={"/dailystocks/:currentPage" } component={TradingList} />
              <Route exact path="/tradedetail/:slug.:id.html" component={TradeDetail}/>
              <Route exact path={"/editTrade/:id"} component={EditTrade} /> */}
              <Route exact path={"/underconstruction"} component={UnderConstruction} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogoutFetch: () => dispatch(userLogoutFetch())
})

const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong App.js ' + JSON.stringify(state.userSignin));
  
  return {
      // currUser: state.userSignin.userInfo  //8/3 tam doi ve userSignin
      currUser: state.userSignin
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
