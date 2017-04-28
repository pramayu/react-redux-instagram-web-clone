
module.exports = function (tme) {
  var msperMinute = 60 * 1000;
  var msperHour = msperMinute * 60;
  var msperDay = msperHour * 24;
  var msperMonth = msperDay * 30;
  var msperYear = msperDay * 365;

  var current = new Date();
  var previous = new Date(tme);
  var elapsed = Math.abs(current - previous);
  if(elapsed < msperMinute){
    var seconds =  Math.round(elapsed/1000) + 's';
  } else if(elapsed < msperHour){
    var minute = Math.round(elapsed/msperMinute) + 'm';
  } else if (elapsed < msperDay) {
    var hour = Math.round(elapsed/msperHour) + 'h';
  } else if (elapsed < msperMonth) {
    var day =  Math.round(elapsed/msperDay) + 'd';
  } else if (elapsed < msperYear) {
    var month = Math.round(elapsed/msperMonth) + 'mo';
  } else {
    var year = Math.round(elapsed/msperYear) + 'y';
  }
  return {
    seconds, minute, hour, day, month, year
  }
}
