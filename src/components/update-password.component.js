import React, { Component } from "react";
import userDataService from "../services/user.service";
import axios from "axios";
import myUtility from "../utils/utility";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';


class UpdatePassword extends Component {
    constructor(props) {
      super(props);
      this.onChangePassword = this.onChangePassword.bind(this);

      
      this.getUser = this.getUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
      // this.deleteUser = this.deleteUser.bind(this);

      this.state = {
          API_URL: process.env.REACT_APP_URL,
          loading: null,
          userInfo: null,
          currentUser: {
            id: null,
            user: '',
            password: '',
            token: ''
          },
          message: "",
          selectedFile: null,
          // user: '',
          // email: '',
          // password: '',
          // isadmin: 0,
          error: null
      };
  }

  componentDidMount() {

    console.log('hi update pass diMount');
    
      console.log('params ID' + this.props.match.params.id);
      console.log('params token' + this.props.match.params.token);
      
      this.getUser(this.props.match.params.id);

      // this.getUser(this.props.currUser.userInfo.id);
    
  }

  onChangePassword(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }

  getUser(id) {
    console.log('user id trg getUser: ' + id);
    userDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  //works great 6/26/2020
  updateUser() {
    
    //console.log('CAT id trong update: ' + this.state.currentUser.id);
    userDataService.updateForgetPassword(
      this.state.currentUser.id,
      this.props.match.params.token,
      this.state.currentUser
    )
      .then(response => {
        // Sequelize xong
        console.log('user updated ' + response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

render() {
    const { currentUser } = this.state;

    return (
      <div className="profile-info">
      <div className="form">
        {/* <form onSubmit={this.submitHandler} > */}
        <form >
          <ul className="form-container">
            
            
            <li>
              <h2>Reset New Password
              </h2>
              {/* avatars folder is the same level of app folder */}
              <img className="avatar-image" src={this.state.API_URL + "avatars/"+ currentUser.avatar} alt={currentUser.avatar}></img>
              
            </li>
            <li>
              {this.state.loading && <div>Loading...</div>}
              {this.state.error && <div>{this.state.error}</div>}
              {this.state.message && <div>{this.state.message}</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name: {currentUser.user}
              </label>
            </li>

            {/* htmlFor="email"> */}
            <li>
              <label >Email: {currentUser.email} </label>
            </li>

            <li>
              <label htmlFor="password">Password</label>
              <input value={currentUser.password} type="" id="password" name="password" onChange={(e) => this.onChangePassword(e)}>
              </input>
            </li>

            <li>
                <label>
                  <strong>Status: </strong>
                  {currentUser.isadmin ? "Regular" : "Admin"}
                </label>
            </li>
            
            <li>
                <button type="button"  onClick={this.updateUser} className="btn-block btn-success">Update New Password</button>
                {/* <button type="button"  onClick={this.updateUser} className="btn-block btn-danger">Delete</button> */}
            </li>
            
          </ul>
        </form>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLogoutFetch: () => dispatch(userLogoutFetch())
})
const mapStateToProps = (state, ownProps) => {
  console.log('userSignin trong Reset Password phan mapstatetoprops' + JSON.stringify(state.userSignin));
  
  return {
      currUser: state.userSignin.userInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

