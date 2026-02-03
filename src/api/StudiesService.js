import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
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
    .get(`/studies/${id}/verify`, { password })
    .then((res) => res)
    .catch((error) => {
      console.log('userCheck Error:', error.response?.data || error.message);
    });
};
