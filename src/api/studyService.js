import client from '../lib/client';

export const getStudyList = async (params) => {
  try {
    const response = await client.get('/studies', { params });
    return response.data;
  } catch (error) {
    console.error('스터디 목록 조회 에러:', error);
    throw error;
  }
};
