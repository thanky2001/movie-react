import axios from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
    baseURL: "https://movie0706.cybersoft.edu.vn/api",
    // Bỏ qua giá trị null và undefined trong params
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true}),
});

axiosClient.interceptors.request.use(
    (config) => {
      //Xử lý trước khi request được gửi lên server
      //Thêm authorization vào header
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const {accessToken} = JSON.parse(userInfo)
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      //Xử ly' khi request bị lỗi
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      //Xử lý kết quả trả về từ Server
      return response;
    },
    //Xử lý nếu kết quả trả về bị lỗi
    (error) => {
      if(error.status === 401){
        //Xu ly logout: clear localStorage, day nguoi dung ve trang login
      }
      if(error.status === 500){
        //Xu ly thong bao cho nguoi dung dang co loi~ tu server
      }
      return Promise.reject(error);
    },
  )
  
  export default axiosClient;
