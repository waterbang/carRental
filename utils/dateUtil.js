const number = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '日'
}
function filterDay(day) { //20200602
  return `${day.slice(0,4)}-${day.slice(4,6)}-${day.slice(6,8)}`
}

function isMonthDayNumber(year, month) {
  let date = new Date(year, month, 0);
  return date.getDate()
}

function formatNumber(n) {
  n = n.toString()
  if (!n) n = "0"
  return n[1] ? n : '0' + n
}

function getDate(time, splitStr) {
  if (!time) return '';
  time = time + "";
  var formatedDate = time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8) + " " + time.slice(8, 10) + ":" + time.slice(10, 12);
  var date = new Date(formatedDate);
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  if (M < 10) M = "0" + M;
  if (d < 10) d = "0" + d;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  return M + '月' + d + '日 周' + number[date.getDay()] + " " + h + ':' + m;
}

function getDateTime(time) {
  if (!time) return '';
  time = time + "";
  var formatedDate = time.slice(0, 4) + '/' + time.slice(4, 6) + '/' + time.slice(6, 8) + " " + time.slice(8, 10) + ":" + time.slice(10, 12);
  var date = new Date(formatedDate);
  var curDate = new Date();
  return curDate.getTime() < date.getTime();
}
module.exports = {
  number,
  isMonthDayNumber,
  formatNumber,
  getDate,
  getDateTime,
  filterDay
}