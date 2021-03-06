import React, { Component } from "react";
import userDataService from "../services/user.service";
import axios from "axios";
import myUtility from "../utils/utility";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';


class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
      
      this.getUser = this.getUser.bind(this);
      this.updateIsAdmin_status = this.updateIsAdmin_status.bind(this);
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
            token: '',
            isadmin: 0
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

    console.log('hi profilet diMount');
    if (this.props.currUser === null) {
      this.props.history.push("/signin");
    }
    else {
      console.log('params ' + this.props.match.params.id);
      console.log('params ' + this.props.currUser.id);
      this.getUser(this.props.match.params.id);

      // this.getUser(this.props.currUser.userInfo.id);
    }
  }

  onChangeUser(e) {
    const user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          user: user
        }
      };
    });
  }

  
  onChangeEmail(e) {
    // const name = e.target.name;
    // const value = e.target.value;
    const email = e.target.value;
    console.log('email moi ' +  email);
    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    });
    console.log('new user ' + JSON.stringify(this.state.currentUser));
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

  updateIsAdmin_status(isadmin) {
    console.log('isadmin old ' + isadmin);
    var data = {
      id: this.state.currentUser.id,
      user: this.state.currentUser.user,
      avatar: this.state.currentUser.avatar,
      password: this.state.currentUser.password,
      email: this.state.currentUser.email,
      isadmin: isadmin
    };
    console.log('isadmin new ' + data.isadmin);

    userDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            isadmin: isadmin
          }
        }));
        console.log('Role updated ' + response.data);
        this.setState({
          message: "The User's role was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  fileSelectedHandler = event => {
    const avatar = event.target.files[0].name
    
    this.setState({
      selectedFile: event.target.files[0],
    })
    
    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng
    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          avatar: "../avatars/" + avatar,
        }
      };
    });
    // --- update trong phan state.* rieng, phan state.currentTrade (la object trong state) rieng

  }

  //works great 6/26/2020
  updateUser() {
    
    //console.log('CAT id trong update: ' + this.state.currentUser.id);
    userDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        // Sequelize xong
        console.log('user updated ' + response.data);
        this.setState({
          message: "The User was updated successfully!"
        });

        // Xu ly tiep phan upload file
        myUtility.uploadFiles("upfileAvatars", this.state.selectedFile);

      })
      .catch(e => {
        console.log(e);
      });
  }

  // works great 6/26/2020
  // nhung da xoa button roi vi delete trong day co ve khong hop ly
  // deleteUser() {  
  //   //console.log('vo delete func   :  ' + this.state.currentUser.id);  
  //   const users_id = this.state.currentUser.id;

  //   userDataService.delete(this.state.currentUser.id)
  //     .then(response => {
  //       console.log(response.data);
        
  //       this.props.history.push('/')
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  logoutHandler = (e) => {
    e.preventDefault();
    // dispatch(userLoginFetch(this.state.user, this.state.password));
    // this.props.userLogoutFetch(this.state.user,this.state.password);
    this.props.userLogoutFetch();
    this.props.history.push("/");
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="profile-info">
      <div className="form">
        {/* <form onSubmit={this.submitHandler} > */}
        <form >
          <ul className="form-container">
            {
              (this.props.match.params.id == this.props.currUser.id) && 
            <li>
              <button type="button" onClick={this.logoutHandler} className="btn-block btn-danger">Logout</button>
            </li>
            }
            
            <li>
              <h2>User Profile  
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
                Name
              </label>
              <input value={currentUser.user} type="user" name="user" id="user" onChange={(e) => this.onChangeUser(e)}>
              </input>
            </li>


            <li className="form-group">
                <label htmlFor="products_price">Avatar</label>
                {/* <img className="avatar-image" src={this.state.API_URL + "avatars/" + this.state.avatar} alt={this.state.avatar}></img> */}
                <input className="avatarfile" type="file" onChange={this.fileSelectedHandler}></input>
                <input
                  type="text"
                  className="form-control"
                  id="products_image"
                  value={this.state.avatar}
                  onChange={this.onChangepAvatar}
                />
            </li>

            {/* htmlFor="email"> */}
            <li>
              <label >Email </label>
              <input value={currentUser.email} type="text" name="email" id="email" onChange={(e) => this.onChangeEmail(e)}>
              </input>
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
            
            
            {/* { this.props.currUser.id !== this.state.currentUser.id ? */}
            { this.props.currUser.isadmin === 0 && this.props.currUser.id !== this.state.currentUser.id?
                <li>
                    {currentUser.isadmin ? (
                      <button
                        className="btn badge-primary"
                        onClick={() => this.updateIsAdmin_status(0)}
                      > Change to Admin Role
                      </button>
                    ) : (
                      <button
                        className="btn btn-info"
                        onClick={() => this.updateIsAdmin_status(1)}
                      > Change to Regular User
                      </button>
                    )}
                </li>  

            : null

            }
              <li>
                <button type="button"  onClick={this.updateUser} className="btn-block btn-success">Update</button>
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
  console.log('userSignin trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin));
  
  return {
      currUser: state.userSignin.userInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

