import http from '../utils/httpUtils.js';

export function addGoalPost(data) {
  return http.post("/goal-post", data);
}

export function getGoalPostsByGoalId(goalId) {
  return http.get(`/goal-post/${goalId}`);
}