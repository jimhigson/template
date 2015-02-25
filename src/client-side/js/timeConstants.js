var TIME_CONSTANTS = (function(){

    var MINUTE = 60 * 1000;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    var YEAR = DAY * 365.24;
    var AVERAGE_MONTH = YEAR/12;

    return {
      MINUTE : MINUTE
    , HOUR : HOUR
    , DAY : DAY
    , YEAR : YEAR
    , AVERAGE_MONTH : AVERAGE_MONTH
    };
}())