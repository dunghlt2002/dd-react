import React, { Component } from "react";
import userDataService from "../services/user.service";
import axios from "axios";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import myUtility from "../utils/utility";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangeUsers_Password = this.onChangeUsers_Password.bind(this);
    this.sendVerifyEmail = this.sendVerifyEmail.bind(this);

    this.state = {
      id: null,
      user: "Cheo",
      email: "dunghlt2002@gmail.com", 
      id_return: null,
      user_return: null,
      email_return: null,
      // users_password: "aaa", 
      // users_: "aaa", 
      // users_: "aaa", 
      submitted: false,
      message: ""
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  // onChangeUsers_Password(e) {
  //   this.setState({
  //     users_password: e.target.value
  //   });
  // }


  sendVerifyEmail() {
    console.log('sendVerifyEmail');
    var data = {
      user: this.state.user,
      email: this.state.email
      // users_: this.state.,
      // password: this.state.users_password  // password so bi keyword nen dat ten hoi lon xon
    };
  var id_return;
  var user_return;
  var resettoken;
  userDataService.findByNameEmail(this.state.user, this.state.email)
      .then(response => {
        this.setState({
          // id_return: response.data[0].id,
          // user_return: response.data[0].user,
          // email_return: response.data[0].email,
          submitted: true
        });
        id_return = response.data.id
        user_return = response.data.user
        resettoken = response.data.resettoken
        console.log('user return : ' + resettoken);

        const CLIENT_URL = process.env.REACT_APP_CLIENT_URL
        const API_URL = process.env.REACT_APP_API_URL
        // console.log('CLIENT_URL '  + CLIENT_URL);

            // if (this.state.user === this.state.user_return & user_return !== null) {
              if (this.state.user === user_return ) {
                console.log('HI user ' + user_return + ". You forgot your pass? " + resettoken);
                this.setState({
                  message: "User found! " + data.user,
                })
            
                // http://localhost:3000/updatepassword/25
                // http://localhost:3000/updatepassword/25


                  // mailling
                  var url_reset = CLIENT_URL + "updatepassword/"  + id_return + "/" + resettoken
                  console.log('url reset : ' + url_reset);
                  
                  const messageHtml =  renderEmail(
                    <MyEmail name={this.state.user}> 
                      "Hi user: {this.state.user + ". If you forgot your password, click the link below to reset it. Thank you! DD app team."}
                      <a style={{ paddingLeft: 10 }}  href={url_reset} >Change new password, click here.!</a>
                    </MyEmail>
                  );
          
                  axios({
                      method: "POST", 
                      url: API_URL + "sendForgotPassword", 
                      data: {
                  name: this.state.user,
                  email: this.state.email,
                  messageHtml: messageHtml
                      }
                  }).then((response)=>{
                      if (response.data.msg === 'success'){
                          alert("Email sent, awesome!"); 
                          // this.resetForm()
                      }else if(response.data.msg === 'fail'){
                          alert("Oops, something went wrong. Try again")
                      }
                  })
            } // xong phan kiem tra user va email



      })
      .catch(e => {
        console.log(e);
      });

  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-info">
            <h4>Please check your email to reset passowrd</h4>
            <h6>Do not check email, this function is under construction .... hihihi</h6>
            {this.state.message}.


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
              <button className="btn-block btn-primary" onClick={this.newUser}>
                Add New User
              </button>
                  : null ) : <Link to="signin"> Sign-in here</Link>
              }

          </div>
        ) : (
          <div className="form-container">
            <li>
              <h2>Reset Password</h2>
            </li>
            <li className="form-group">
              <label htmlFor="user">User name</label>
              <input
                type="text"
                className="form-control"
                id="user"
                required
                value={this.state.user}
                onChange={this.onChangeUser}
                name="user"
              />
            </li>


            <li className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </li>

            {/* <div className="form-group">
              <label htmlFor="users_password">Recent good password you remember</label>
              <input
                type="text"
                className="form-control"
                id="users_password"
                required
                value={this.state.users_password}
                onChange={this.onChangeUsers_Password}
                name="users_password"
              />
            </div> */}

            <button onClick={this.sendVerifyEmail} className="btn btn-primary">
              Send Verify Email
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


export default connect(mapStateToProps, null)(ForgotPassword);