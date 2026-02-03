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
}

// GET 스터디 목록조회하기
export const getStudyList = async (params) => {
  try {
    const response = await client.get('/studies', { params });
    return response.data;
  } catch (error) {
    console.error('getEmojiList Error:', error.response?.data || error.message);
    throw error;
  }
};


export const getStudyList = () => {
  return instance
    .get(`/studies`)
    .then((res) => res)
    .catch((error) => {
      console.log('getEmojiList Error:', error.response?.data || error.message);
    });
};

export const getStudy = (id) => {
  return instance
    .get(`/studies/${id}`)
    .then((res) => res)
    .catch((error) => {
      console.log('getEmojiList Error:', error.response?.data || error.message);
    });
};

export const deleteStudy = (id) => {
  return instance
    .delete(`/studies/${id}`)
    .then((res) => res)
    .catch((error) => {
      console.log('userCheck Error:', error.response?.data || error.message);
    });
};

export const userCheck = (id, { password }) => {
  return instance
    .get(`/studies/${id}/verify`, { password })
    .then((res) => res)
    .catch((error) => {
      console.log('userCheck Error:', error.response?.data || error.message);
    });
};
