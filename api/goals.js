import http from '../utils/httpUtils.js';

export function userGoalList(userId) {
  return http.get('/goals/' + userId);
}
