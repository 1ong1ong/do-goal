import http from '../utils/httpUtils.js';

export function userGoalList() {
  return http.get(`/goals/user`);
}

export function userMakeGoal(goalId) {
  return http.put(`/goals/${goalId}`);
}

export function getGoalList() {
  return http.get('/goals');
}

export function addSystemGoal(goalId, data) {
  return http.post(`/goals/${goalId}/system`, data);
}

export function modifySystemGoal(goalId, data) {
  return http.put(`/goals/${goalId}/system`, data);
}

export function getGoalMakeDetail(goalId) {
  return http.get(`/goals/make/detail/${goalId}`);
}

export function getGoalRankList(goalId) {
  return http.get(`/goals/rank/${goalId}`);
}


export function deleteUserGoal(goalId) {
  return http.delete(`/goals/${goalId}`);
}