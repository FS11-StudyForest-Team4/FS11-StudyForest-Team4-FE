import Study from '@/pages/study/Study';

const API_BASE_URL = 'http://localhost:5001/api';

//GET 습관 목록조회
export async function fetchHabits(studyId) {
  try {
    const response = await fetch(`${API_BASE_URL}/studies/${studyId}/habits`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

//POST 습관 생성
export async function createHabit(studyId, habitData) {
  try {
    const response = await fetch(`${API_BASE_URL}/studies/${studyId}/habits`, {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

//fetch로 API 연동하기
// export async function fetchProducts(params = {}) {
//   const query = new URLSearchParams(params).toString();

//   try {
//     const response = await fetch(`${API_BASE_URL}/products?${query}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     throw error;
//   }
// }
