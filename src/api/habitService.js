import client from '@/lib/client';

// GET 습관 목록조회
export const getHabitList = async (studyId) => {
  try {
    const res = await client.get(`/studies/${studyId}/habits`);
    return res.data;
  } catch (error) {
    console.log('getHabitList Error:', error.response?.data || error.message);
    //throw error ? 호출에서 에러메시지 여부고민
  }
};
// POST 습관생성
export const createHabit = async (studyId, { name }) => {
  try {
    const res = await client.post(`/studies/${studyId}/habits`, { name });
    return res.data;
  } catch (error) {
    console.log('createHabit Error:', error.response?.data || error.message);
  }
};

// PATCH 습관수정
export const updateHabit = async (habitId, { name }) => {
  try {
    const res = await client.patch(`/habits/${habitId}`, { name });
    return res.data;
  } catch (error) {
    console.log('updateHabit Error:', error.response?.data || error.message);
  }
};

// DELETE 습관 삭제
export const deleteHabit = async (habitId) => {
  try {
    const res = await client.delete(`/habits/${habitId}`);
    return res.data;
  } catch (error) {
    console.log('deleteHabit Error:', error.response?.data || error.message);
  }
};
