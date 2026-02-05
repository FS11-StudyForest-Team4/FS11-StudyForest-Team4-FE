import axios from 'axios';

//우선 하드코딩해서 DB 연결 확인했습니다! 환경변수 분리해주시면 감사하겠습니다.
export const instance = axios.create({
  baseURL: 'http://study-forest.iptime.org:5001/api', 
  timeout: 3000,
});

export const getStudyList = () => {
  return instance
    .get(`/studies`)
    .then((res) => res)
    .catch((error) => {
      console.log('getEmojiList Error:', error.response?.data || error.message);
    });
};

export const getStudy = (id) => {
  return instance
    .get(`/studies/${id}`)
    .then((res) => res)
    .catch((error) => {
      console.log('getEmojiList Error:', error.response?.data || error.message);
    });
};

export const deleteStudy = (id) => {
  return instance
    .delete(`/studies/${id}`)
    .then((res) => res)
    .catch((error) => {
      console.log('userCheck Error:', error.response?.data || error.message);
    });
};

export const userCheck = (id, { password }) => {
  return instance
    .post(`/auth/${id}/verify`, { password })
    .then((res) => res)
    .catch((error) => {
      console.log('userCheck Error:', error.response?.data || error.message);
    });
};
