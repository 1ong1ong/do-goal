import http from '../utils/httpUtils.js';

export function getThemes() {
  return http.get(`/theme`);
}

export function getByThemeId(themeId) {
  return http.get(`/theme/${themeId}`);
}