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

