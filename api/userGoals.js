import http from '../utils/httpUtils.js';

export function getUserGoalInfo(goalId) {
  return http.get(`/user-goal/${goalId}`);
}

export function updateUserGoalInfo(goalId, data) {
  return http.put(`/user-goal/${goalId}`, data);
}