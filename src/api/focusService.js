import client from '@/lib/client';

// GET - studyId에 맞는 집중 불러오기 -> studyId, totalPoint 리턴합니다
export const getFocus = async (studyId) => {
  try {
    const res = await client.get(`/focus/${studyId}`);
    return res.data;
  } catch (error) {
    console.error('getFocus Error: ', error);
    throw error;
  }
};

// POST - 오늘의 집중 시작
export const createFocus = async (studyId) => {
  try {
    const res = await client.post('/focus', { studyId });
    return res.data;
  } catch (error) {
    console.error('createFocus Error: ', error);
    throw error;
  }
};

// PATCH - 오늘의 집중 완료 (50포인트 적립)
export const completeFocus = async (focusId, earnedPoint) => {
  try {
    const res = await client.patch(`/focus/${focusId}`, { earnedPoint });
    return res.data;
  } catch (error) {
    console.error('completeFocus Error: ', error);
    throw error;
  }
};
