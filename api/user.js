import http from '../utils/httpUtils.js';

export function updateUserInfo(userId, data) {
  return http.put('/user/' + userId, data);
}

export function getCurrentUserInfo() {
  return http.get('/user');
}
