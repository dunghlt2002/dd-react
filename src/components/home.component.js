import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    constructor(props) {
      super(props);
      // this.onChangeUser = this.onChangeUser.bind(this);
      // this.onChangePassword = this.onChangePassword.bind(this);

      this.state = {
          isadmin: 1
      };
  }

  componentDidMount() {

  }

  
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
          DD Project - Home Page
      </div>
      <div className="form">
          <Link to="signin">Sign-in here</Link>
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
      currUser: state.userSignin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

