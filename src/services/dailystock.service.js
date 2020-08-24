import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://dd-dailystock-node.herokuapp.com/api/'

class dailystockDataService {
  
  delete(transaction_id) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    // return axios.delete(API_URL + `/dailystocks/${transaction_id}`,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
    return axios.delete(API_URL + `/dailystock/${transaction_id}`);
  }

  getAll(currentPage,search_keyword) {
    console.log('get all transactions here limit ' + currentPage) ;
    return axios.get(API_URL + `dailystocks/${currentPage}?search_keyword=${search_keyword}`);
  }

  getAllSymbol() {
    return axios.get(API_URL + `/symbolcodelist`);
  }

  get(id) {
    console.log('lay 1 record khg xuyt' + id);
    return axios.get(API_URL + `dailystock/${id}`);
  }

  

  builkCreate(data) {
    console.log('vo day chua ta BULK ' + JSON.stringify(data));
    return axios.post(API_URL + `bulkdailystocks`, data);
  }

  create(data) {
    console.log('hihi add new transction in service ' + JSON.stringify(data));
    return axios.post(API_URL + `dailystock`, data);
  }

  update(transaction_id, data) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    console.log('user in service:  ' + JSON.stringify(data));
    return axios.put(API_URL + `/dailystock/${transaction_id}`, data);
    // return axios.put(API_URL + `/dailystock/${transaction_id}`, data,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
  }
  
  findByKeyword(search_keyword) {
    console.log('hi search name');
    return axios.get(API_URL + `/users?search_keyword=${search_keyword}`);
  }

  findByusers_name(users_name) {
    return axios.get(API_URL + `/users?users_name=${users_name}`);
  }

  // deleteAll() {
  //   return http.delete(`/users`);
  // }

}

export default new dailystockDataService();