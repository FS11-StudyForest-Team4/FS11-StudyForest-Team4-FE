import client from '../lib/client';

export const getStudyList = async (orderBy) => {
  try {
    const response = await client.get('/studies', {
      params: { orderBy },
    });
    return response.data;
  } catch (error) {
    console.error('스터디 목록 조회 에러:', error);
    throw error;
  }
};
