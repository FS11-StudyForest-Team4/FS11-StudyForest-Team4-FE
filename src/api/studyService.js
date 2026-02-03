import client from '@/lib/client';

// POST 스터디 만들기
export const createStudy = async (data) => {
  try {
    const res = await client.post(`/studies`, data);
    return res.data;
  } catch (error) {
    console.log('createStudy Error:', error.response?.data || error.message);
  }
};

// PATCH 스터디 수정하기
export const updateStudy = async (studyId, data) => {
  try {
    const res = await client.patch(`/studies/${studyId}`, data);
    return res.data;
  } catch (error) {
    console.log('updateStudy Error:', error.response?.data || error.message);
  }
};
