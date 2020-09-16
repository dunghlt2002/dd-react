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

    userDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          email: response.data.email,
          // password: response.data.password,
          submitted: true
        });
        console.log('new user : ' + JSON.stringify(response.data));
        this.setState({
          message: "New user: " + data.user + " has just created sucessfully!",
        })

        // Xu ly tiep phan upload file
        myUtility.uploadFiles("upfileAvatars", this.state.selectedFile);

      })
      .catch(e => {
        console.log(e);
      });


          // mailling
            // const messageHtml =  renderEmail(
            //   <MyEmail name={this.state.user}> 
            //     "A user name: {this.state.user + " has just created in our system. Thank you for joinging us."}
            //   </MyEmail>
            // );
    
            // axios({
            //     method: "POST", 
            //     url: "http://localhost:8080/send", 
            //     data: {
            // name: this.state.user,
            // email: this.state.email,
            // messageHtml: messageHtml
            //     }
            // }).then((response)=>{
            //     if (response.data.msg === 'success'){
            //         alert("Email sent, awesome!"); 
            //         // this.resetForm()
            //     }else if(response.data.msg === 'fail'){
            //         alert("Oops, something went wrong. Try again")
            //     }
            // })

  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-info">
            <h4>Please check your email to reset passowrd</h4>
            <h6>Do not check email, this function is under construction .... hihihi</h6>


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
              <button className="btn-block btn-primary" onClick={this.newUser}>
                Add New User
              </button>
                  : null ) : <Link to="signin">Sign-in here</Link>
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