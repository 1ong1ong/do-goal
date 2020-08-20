import http from "../utils/httpUtils";

export function getWeekReport() {
  return http.get('/user-goal-report');
}
