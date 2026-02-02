export function getStartOfweek(current = new Date()) {
  const today = new Date(current);
  today.setHours(0, 0, 0, 0); // 시간 초기화
  const diff = (today.getDay() + 6) % 7; //월요일 시작으로 조정
  const startOfWeek = new Date(
    today.getTime() - diff * 24 * 60 * 60 * 1000, //월요일날짜
  )
    .toISOString()
    .slice(0, 10);
  return startOfWeek;
}

// export function getThisWeekDates(current = new Date()) {
//   const today = new Date(current);
//   today.setHours(0, 0, 0, 0) // 시간 초기화

//   const day = today.getDay(); // 오늘 요일 확인 (0 = 일, 1 = 월)
//   const diff = (day + 6) % 7; //월요일 시작으로 조정
//   const startOfWeek = new Date(today.getTime() - diff * 24 * 60 * 60 * 1000); //월요일날짜

//   const weekDates = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
//     return d.toISOString().slice(0, 10);
//   });
//   return weekDates;
// }
