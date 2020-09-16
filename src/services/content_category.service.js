import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

class content_categoryDataService {
  
  delete(transaction_id) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    // return axios.delete(API_URL + `/dailystocks/${transaction_id}`,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
    console.log('xoa id ' + transaction_id); 
    return axios.delete(API_URL + `content_cat/${transaction_id}`);
  }

  getAll() {
    console.log('get all content_cat ') ;
    return axios.get(API_URL + `content_cats`);
    // return axios.get(API_URL + `content_cats/${currentPage}?search_keyword=${search_keyword}`);
  }

  get(id) {
    console.log('lay 1 record khg xuyt' + id);
    return axios.get(API_URL + `content_cat/${id}`);
  }

  builkCreate(data) {
    console.log('vo day chua ta BULK ' + JSON.stringify(data));
    return axios.post(API_URL + `bulkcontent_cats`, data);
  }

  create(data) {
    console.log('hihi add new transction in service ' + JSON.stringify(data));
    return axios.post(API_URL + 'content_cat', data);
  }

  update(transaction_id, data) {
    // const userInfo = Cookie.getJSON('userInfo') || null;
    // const token = userInfo.token;
    console.log('content in service:  ' + JSON.stringify(data));
    return axios.put(API_URL + `content_cat/${transaction_id}`, data);
    // return axios.put(API_URL + `/dailystock/${transaction_id}`, data,
    // { headers: {'Authorization': `Bearer ${token}` }}
    // );
  }
  
  findByKeyword(search_keyword) {
    console.log('hi search subject');
    return axios.get(API_URL + `content_cats?search_keyword=${search_keyword}`);
  }

}

export default new content_categoryDataService();