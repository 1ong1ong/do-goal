import http from '../utils/httpUtils.js';

export function getArticleById(articleId) {
  return http.get(`/article-config/${articleId}`);
}

export function getUpdateLogs() {
  return http.get(`/article-config/update-logs`);
}