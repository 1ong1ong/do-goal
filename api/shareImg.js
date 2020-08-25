import http from '../utils/httpUtils.js';

export function randomShareImg() {
  return http.get(`/share-img/random`);
}

