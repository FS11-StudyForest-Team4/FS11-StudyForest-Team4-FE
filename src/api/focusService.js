import client from '@/lib/client';

// GET - studyId에 맞는 집중 불러오기
export const getFocus = async (studyId) => {
  try {
    const res = await client.get(`/focus/${studyId}`);
    return res.data;
  } catch (error) {
    console.error('getFocus Error: ', error);
  }
};

// POST - 오늘의 집중 시작
export const createFocus = async (studyId) => {
  try {
    const res = await client.post('/focus', { studyId });
    return res.data;
  } catch (error) {
    console.error('createFocus Error: ', error);
  }
};

// PATCH - 오늘의 집중 완료 (50포인트 적립)
export const completeFocus = async (focusId) => {
  try {
    const res = await client.patch(`/focus/${focusId}`);
    return res.data;
  } catch (error) {
    console.error('completeFocus Error: ', error);
  }
};
