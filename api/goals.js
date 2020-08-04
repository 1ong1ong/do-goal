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

export function addSystemGoal(goalId, data) {
  return http.post(`/goals/${goalId}/system`, data);
}

export function getGoalMakeDetail(goalId) {
  return http.get(`/goals/make/detail/${goalId}`);
}

export function getGoalRankList(goalId) {
  return http.get(`/goals/rank/${goalId}`);
}