import http from '../utils/httpUtils.js';

export function getVersionAuditStatus(versionNum) {
  return http.get(`/version/${versionNum}/status`);
}
