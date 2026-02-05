import client from '@/lib/client';
import { util } from '@/utils';

export const createUserCheck = async (id, { password }) => {
  try {
    const response = await client.post(`/studies/${id}/auth`, { password });
    return response;
  } catch (error) {
    console.error(
      'createUserCheck Error:',
      error.response?.data || error.message,
    );
    const message = error.response?.data?.error || error.response?.data.message;

    if (message === 'Invalid password') {
      util.errorAlert('비밀번호가 일치하지 않습니다.');
    } else if (message === 'Validation failed') {
      util.errorAlert('비밀번호를 입력해주세요.');
    } else {
      util.errorAlert('인증에 실패했습니다.');
    }
    throw error;
  }
};

export const getUserCheck = async (id) => {
  try {
    const response = await client.get(`/studies/${id}/auth`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    const message = error.response?.data?.error || error.response?.data.message;
    console.error('getUserCheck Error:', message);
  }
};
