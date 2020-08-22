import React, { Component } from "react";
import { userLogoutFetch } from '../actions/userActions';
import { connect } from 'react-redux';

class UnderConstruction extends Component {
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
          This page is under construction - level 1.
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
  // console.log('ID  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.id));
  // console.log('token  trong Profile phan mapstatetoprops' + JSON.stringify(state.userSignin.userInfo.token));
  
  return {
      currUser: state.userSignin
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction);

