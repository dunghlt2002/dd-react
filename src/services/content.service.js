import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL

class contentDataService {
  
  delete(transaction_id) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    // return axios.delete(API_URL + `/dailystocks/${transaction_id}`,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
    console.log('xoa id ' + transaction_id); 
    return axios.delete(API_URL + `content/${transaction_id}`);
  }

  getAll(currentPage,search_keyword) {
    console.log('get all transactions here limit ' + currentPage) ;
    return axios.get(API_URL + `contents/${currentPage}?search_keyword=${search_keyword}`);
  }

  // de danh cho category
  // getAllSymbol() {
  //   return axios.get(API_URL + `symbolcodelist`);
  // }

  get(id) {
    console.log('lay 1 record khg xuyt' + id);
    return axios.get(API_URL + `content/${id}`);
  }

  builkCreate(data) {
    console.log('vo day chua ta BULK ' + JSON.stringify(data));
    return axios.post(API_URL + `bulkcontents`, data);
  }

  create(data) {
    console.log('hihi add new transction in service ' + JSON.stringify(data));
    return axios.post(API_URL + 'content', data);
  }

  update(transaction_id, data) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    console.log('content in service:  ' + JSON.stringify(data));
    return axios.put(API_URL + `content/${transaction_id}`, data);
    // return axios.put(API_URL + `/dailystock/${transaction_id}`, data,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
  }
  
  findByKeyword(search_keyword) {
    console.log('hi search subject');
    return axios.get(API_URL + `users?search_keyword=${search_keyword}`);
  }

  findByusers_name(users_name) {
    return axios.get(API_URL + `contents?subject=${users_name}`);
  }

  // deleteAll() {
  //   return http.delete(`/users`);
  // }

}

export default new contentDataService();