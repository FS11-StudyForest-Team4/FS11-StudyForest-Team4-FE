import client from '@/lib/client';

export const userCheck = async (id, { password }) => {
  try {
    const response = await client.get(`/studies/${id}/verify`, { password });
    return response.data;
  } catch (error) {
    console.error('deleteStudy Error:', error.response?.data || error.message);
    throw error;
  }
};