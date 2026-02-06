import client from '@/lib/client';

// GET 스터디 목록조회하기
export const getStudyList = async (params) => {
  try {
    const response = await client.get('/studies', { params });
    return response.data;
  } catch (error) {
    console.error('getStudyList Error:', error.response?.data || error.message);
    throw error;
  }
};

// GET 스터디상세 조회하기
export const getStudyId = async (id) => {
  try {
    const response = await client.get(`/studies ${id}`);
    return response.data;
  } catch (error) {
    console.error('getStudy Error:', error.response?.data || error.message);
    throw error;
  }
};

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
    const res = await client.patch(`/studies/${studyId}`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log('updateStudy Error:', error.response?.data || error.message);
    throw error;
  }
};

// DELETE 스터디 삭제하기
export const deleteStudy = async (id) => {
  try {
    const response = await client.delete(`/studies/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('deleteStudy Error:', error.response?.data || error.message);
    throw error;
  }
};
