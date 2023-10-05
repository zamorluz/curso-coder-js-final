const getTimeString = ($time) => {
    let $html       = '',
        days_div    = 1000 * 60 * 60 * 24,
        hours_div   = 1000 * 60 * 60,
        minutes_div = 1000 * 60,
        seconds_div = 1000,
        days_raw    = $time / days_div,
        hours_raw   = ($time % days_div) / hours_div,
        minutes_raw = ($time % hours_div) / minutes_div,
        seconds_raw = ($time % minutes_div) / seconds_div,
        days        = days_raw > 0 ? Math.floor(days_raw) : 0,
        hours       = hours_raw > 0 ? Math.floor(hours_raw) : 0,
        minutes     = minutes_raw > 0 ? Math.floor(minutes_raw) : 0,
        seconds     = seconds_raw > 0 ? Math.floor(seconds_raw) : 0;
    if (days != 0) {
        $html += days + 'd ';
    }
    if (days > 0 || hours > 0) {
        $html += (hours < 10 ? `0${hours}` : hours) + 'h ';
    }
    if (days > 0 || hours > 0 || minutes > 0) {
        $html += (minutes < 10 ? `0${minutes}` : minutes) + 'm ';
    }
    $html += (seconds < 10 ? `0${seconds}` : seconds) + 's';
    return $html;
};
const getFullDate = (separator = '-') => {
    const d = new Date(), 
        year = d.getFullYear(), 
        month = d.getMonth() + 1, 
        day = d.getDate(), 
        hours = d.getHours(), 
        minutes = d.getMinutes(), 
        seconds = d.getSeconds();
    return `${year}${separator}${month < 10 ? '0' : ''}${month}${separator}${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};