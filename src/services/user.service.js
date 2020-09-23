import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL
//const API_URL =  'https://dd-dailystock-node.herokuapp.com/api/'

class userDataService {
  
  getAll(currentPage,search_keyword) {
    
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;    
    
    console.log('get all users here limit ' + currentPage) ;

    return axios.get(
      API_URL + `users/${currentPage}?search_keyword=${search_keyword}`,
      { headers: {'Authorization': `Bearer ${token}` }}
      );
  }

  findByNameEmail(user_name, user_email) {
    console.log('verify 1 user ' + user_name + " - " + user_email);
    return axios.put(API_URL + `forgotpassword/${user_name}?email_keyword=${user_email}`);
  }

  get(id) {
    console.log('lay 1 user ' + id);
    return axios.get(API_URL + `user/${id}`);
  }

  create(data) {
    return axios.post(API_URL + `users`, data);
  }


  update(users_id, data) {
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;
    console.log('user in service:  ' + JSON.stringify(data));
    return axios.put(API_URL + `users/${users_id}`, data,
    { headers: {'Authorization': `Bearer ${token}` }}
    );
  }
  updateForgetPassword(users_id, token, data) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    console.log('user in service:  ' + JSON.stringify(data));
    return axios.put(API_URL + `users/${users_id}`, data,
    { headers: {'Authorization': `Bearer ${token}` }}
    );
  }
  
  delete(users_id) {
    const userInfo = Cookie.getJSON('userInfo') || null;
    const token = userInfo.token;
    return axios.delete(API_URL + `/users/${users_id}`,
    { headers: {'Authorization': `Bearer ${token}` }}
    );
  }

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return axios.get(API_URL + `users?search_keyword=${search_keyword}`);
  }

  findByusers_name(users_name) {
    return axios.get(API_URL + `users?users_name=${users_name}`);
  }

  // deleteAll() {
  //   return http.delete(`/users`);
  // }

}

export default new userDataService();