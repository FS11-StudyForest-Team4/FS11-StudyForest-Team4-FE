import axios from 'axios';

//우선 하드코딩해서 DB 연결 확인했습니다! 환경변수 분리해주시면 감사하겠습니다.
const client = axios.create({
  baseURL: 'http://study-forest.iptime.org:5001/api',
  withCredentials: true,
  timeout: 3000,
});

export default client;
