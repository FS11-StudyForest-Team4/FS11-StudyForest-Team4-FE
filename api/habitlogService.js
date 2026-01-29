const API_BASE_URL = 'http://localhost:5001/api';

//POST 습관완료 (습관기록등록)

export async function createHabit(habitId, habitlogData) {
  const response = await fetch(`${API_BASE_URL}/habits/${habitId}/habitlog`, {
    method: 'POST',
    body: JSON.stringify(habitlogData),
    headers: {
      'content-type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
}

// GET 습관기록표 // 수정 필요 

export async function fetchHabits(studyId) {
  const response = await fetch(`${API_BASE_URL}/studies/${studyId}/habitlogs`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
}

console.log('책')