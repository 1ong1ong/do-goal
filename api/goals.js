import http from '../utils/httpUtils.js';

export function userGoalList(userId) {
  return http.get(`/goals/${userId}`);
}

export function userMakeGoal(goalId, userId) {
  return http.put(`/goals/${goalId}/users/${userId}`);
}

export function getGoalList() {
  return http.get('/goals');
}