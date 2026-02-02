import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5001/api/emojis',
  timeout: 3000,
});

export const getEmojiList = (studyId) => {
  return instance
    .get(`/${studyId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('getEmojiList Error:', error.response?.data || error.message);
    });
};

export const createEmoji = (studyId, { name }) => {
  return instance
    .post(`/${studyId}`, { name })
    .then((res) => res)
    .catch((error) => {
      console.log('createEmoji Error:', error.response?.data || error.message);
    });
};
