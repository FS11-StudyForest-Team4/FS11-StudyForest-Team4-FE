import client from '@/lib/client';

//POST 습관완료 (습관기록등록)
export const createHabitlog = async (habitId) => {
  try {
    const res = await client.post(`/habits/${habitId}/habitlog`, {});
    return res.data;
  } catch (error) {
    console.log('createHabitlog Error:', error.response?.data || error.message);
  }
};

// GET 습관기록표 // 수정 필요
export const getHabitlogs = async (studyId, startOfWeek) => {
  try {
    const res = await client.get(`/studies/${studyId}/habitlogs`, {
      params: { startOfWeek },
    });
    return res.data;
  } catch (error) {
    console.log('getHabitlogs Error:', error.response?.data || error.message);
  }
};
