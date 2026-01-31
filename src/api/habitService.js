import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 3000,
});

// GET 습관 목록조회
export const getHabitList = (studyId) => {
  return instance
    .get(`/studies/${studyId}/habits`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('getHabitList Error:', error.response?.data || error.message);
    });
};

// POST습관 생성
export const createHabit = (studyId, { name }) => {
  return instance
    .post(`/studies/${studyId}/habits`, { name })
    .then((res) => res.data)
    .catch((error) => {
      console.log('createHabit Error:', error.response?.data || error.message);
    });
};

// PATCH 습관 수정
export const updateHabit = (habitId, { name }) => {
  return instance
    .patch(`/habits/${habitId}`, { name })
    .then((res) => res.data)
    .catch((error) => {
      console.log('updateHabit Error:', error.response?.data || error.message);
    });
};

// DELETE 습관 삭제
export const deleteHabit = (habitId) => {
  return instance
    .delete(`/habits/${habitId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log('deleteHabit Error:', error.response?.data || error.message);
    });
};
