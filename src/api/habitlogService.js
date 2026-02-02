import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 3000,
});

//POST 습관완료 (습관기록등록)
export const createHabitlog = (habitId) => {
  return instance
    .post(`/habits/${habitId}/habitlogs`, {})
    .then((res) => res.data)
    .catch((error) => {
      console.log(
        'createHabitlog Error:',
        error.response?.data || error.message,
      );
    });
};

// GET 습관기록표 // 수정 필요

export const getHabitlogs = (studyId, startOfWeek) => {
  return instance
    .get(`/studies/${studyId}/habitlogs?`, { params: { startOfWeek } })
    .then((res) => res.data)
    .catch((error) => {
      console.log('getHabitlogs Error:', error.response?.data || error.message);
    });
};
