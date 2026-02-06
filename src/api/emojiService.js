import client from '@/lib/client';

export const getEmojiList = async (studyId) => {
  try {
    const res = await client.get(`/emojis/${studyId}`);
    return res.data;
  } catch (error) {
    console.log('getEmojiList Error:', error.response?.data || error.message);
    throw error;
  }
};

export const createEmoji = async (studyId, { name }) => {
  try {
    const res = await client.post(`/emojis/${studyId}`, { name });
    return res;
  } catch (error) {
    console.log('createEmoji Error:', error.response?.data || error.message);
    throw error;
  }
};

export const patchEmoji = async (studyId, { name }) => {
  try {
    const res = await client.patch(`/emojis/${studyId}`, { name });
    return res;
  } catch (error) {
    console.log('patchEmoji Error:', error.response?.data || error.message);
    throw error;
  }
};
