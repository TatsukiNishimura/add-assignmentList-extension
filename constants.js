export const url = 'https://www.cle.osaka-u.ac.jp/learn/api/v1/calendars/dueDateCalendarItems';
export const contentlinkBase = 'https://www.cle.osaka-u.ac.jp/ultra/courses/';
export const classListApiUrl = 'https://www.cle.osaka-u.ac.jp//learn/api/public/v1/calendars/';
// 課題リンク用 合ってるかわからない
export const magicUrl = '/cl/outline?legacyUrl=~2Fwebapps~2Fcalendar~2Flaunch~2Fattempt~2F_';

export const dateCompareText = {
  GREATER_OR_EQUAL: 'greaterOrEqual',
  LESS_OR_EQUAL: 'lessOrEqual',
};

export const calendarDataLimit = 20;

export const assignmentDeadline = {
  TODAY: 0,
  TOMORROW: 1,
  FUTURE: 2,
  EXPIRED: 3,
};

export const jsInitCheckMilliSecond = 2000;

export const yearOfClassId = '202';
// Aなら前期、Bなら後期
export const semester = {
  EARLY: 'A',
  LATE: 'B',
};

export function formatDateForShow(dt) {
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  const h = dt.getHours().toString().padStart(2, '0');
  const M = dt.getMinutes().toString().padStart(2, '0');
  return y + '-' + m + '-' + d + ' ' + h + ':' + M;
}

export function getClassUrl(id) {
  return contentlinkBase + `${id}` + '/cl/outline';
}

export function getAssignmentUrl(courseId, ItemSourceType, ItemSourceId) {
  return contentlinkBase + courseId + magicUrl + ItemSourceType + '-' + ItemSourceId;
}
