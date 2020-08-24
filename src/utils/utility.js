import axios from 'axios';


// thay vi nhot trong http-common dem ra day cho de nhin va chinh header
// const API_URL = 'http://localhost:8080/api/';       // for local
const API_URL = 'https://dd-dailystock-node.herokuapp.com/api/';       // for heroku

class myUtility  {
    
    uploadFiles(folder, myFile) {

        const fd = new FormData();

        // neu co chon file hinh de upload thi moi chay khuc upload nay
        console.log('file duoc chon la ' + myFile);
        if (myFile) {
            fd.append(folder, myFile);
            console.log("ten file se up la " + myFile.name);
            
            // tat ca cac function tren backend deu bat dau la localhost:8080/api
            // con dieu do qui dinh o dau thi khong biet luon
            axios({
                url: "https://dd-dailystock-node.herokuapp.com/api/" + folder,
                method: "post",
                data: fd,
            }).then(res => {
                console.log('file upload result: ' + res.statusText);
            }).catch(e => {
              console.log(e);
            })
          }

    }
    
//   getAll(currentPage,search_keyword) {
    
//     const userInfo = Cookie.getJSON('userInfo') || null;
//     const token = userInfo.token;    
    
//     console.log('get all users here limit ' + currentPage) ;

//     return axios.get(
//       API_URL + `users/${currentPage}?search_keyword=${search_keyword}`,
//       { headers: {'Authorization': `Bearer ${token}` }}
//       );
//   }

//   get(id) {
//     console.log('lay 1 user ' + id);
//     return axios.get(API_URL + `/user/${id}`);
//   }


}

export default new myUtility();