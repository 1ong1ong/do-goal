import http from "../utils/httpUtils";

export function getWeekReport() {
  return http.get('/user-goal-report');
}

export function getWeekReportHisList() {
  return http.get('/user-goal-report/his/list');
}

export function getWeekReportHisDetail(data) {
  return http.get('/user-goal-report/his/detail', data);
}