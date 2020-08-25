import React, { Component } from "react";
import userDataService from "../services/user.service";
import axios from "axios";
import MyEmail from './email.component'
import { renderEmail } from 'react-html-email'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import myUtility from "../utils/utility";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangepAvatar = this.onChangepAvatar.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsers_Password = this.onChangeUsers_Password.bind(this);
    this.onChangeIsAdmin = this.onChangeIsAdmin.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      user: "Cheo",
      email: "dunghlt2002@gmail.com", 
      users_password: "aaa", 
      isadmin: 1, 
      // users_: "aaa", 
      // users_: "aaa", 
      submitted: false,
      selectedFile: null,
      avatar: "../avatars/commingsoon.jpg",
      message: ""
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangepAvatar(e) {
    this.setState({
      avatar: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeUsers_Password(e) {
    this.setState({
      users_password: e.target.value
    });
  }

  onChangeIsAdmin(e) {
    this.setState({
      user: e.target.value
    });
  }

  fileSelectedHandler = event => {
    const avatar = event.target.files[0].name
    console.log('file SMALL selected handler');

    this.setState({
      avatar: "../avatars/" + avatar,
      selectedFile: event.target.files[0]
    })
  }

  saveUser() {
    console.log('vo Usersave');
    var data = {
      user: this.state.user,
      email: this.state.email,
      avatar: this.state.avatar,
      // users_: this.state.,
      password: this.state.users_password,  // password so bi keyword nen dat ten hoi lon xon
      isadmin: this.state.isadmin
    };

    userDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          user: response.data.user,
          avatar: response.data.avatar,
          email: response.data.email,
          password: response.data.password,
          isadmin: response.data.isadmin,
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

  newUser() {
    // set up san gia tri cho new user tiep
    this.setState({
      id: null,
      user: "qqq",
      avatar: "../avatars/commingsoon.jpg",
      password: "qqq",
      email: "dunghlt2002@gmail.com",
      isadmin: 1,
      submitted: false
    });
  }

  render() {
    return (
      <div className="form">
        {this.state.submitted ? (
          <div className="form-info">
            <h4>You submitted successfully!</h4>


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
              <button className="btn-block btn-primary" onClick={this.newUser}>
                Add
              </button>
                  : null ) : <Link to="signin">Sign-in here</Link>
              }

            



          </div>
        ) : (
          <div className="form-container">
            <li>
              <h2>Add New user</h2>
            </li>
            <li className="form-group">
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
            </li>

            
              <li className="form-group">
                <label htmlFor="products_price">Avatar</label>
                {/* <img className="avatar-image" src={"http://localhost:8080/" + this.state.avatar} alt={this.state.avatar}></img> */}
                <input className="avatarfile" type="file" onChange={this.fileSelectedHandler}></input>
                <input
                  type="text"
                  className="form-control"
                  id="products_image"
                  value={this.state.avatar}
                  onChange={this.onChangepAvatar}
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

            <div className="form-group">
              <label htmlFor="users_password">Password</label>
              <input
                type="text"
                className="form-control"
                id="users_password"
                required
                value={this.state.users_password}
                onChange={this.onChangeUsers_Password}
                name="users_password"
              />
            </div>


            { this.props.currUser.userInfo ? ( this.props.currUser.userInfo.isadmin === 0 ?
                <div className="form-group">
                <label htmlFor="isadmin">Admin or Regular</label>
                <input
                  type="text"
                  className="form-control"
                  id="isadmin"
                  required
                  value={this.state.isadmin}
                  onChange={this.onChangeIsAdmin}
                  name="isadmin"
                />
              </div>        
                  : null ) : null
              }

            



            <button onClick={this.saveUser} className="btn btn-primary">
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