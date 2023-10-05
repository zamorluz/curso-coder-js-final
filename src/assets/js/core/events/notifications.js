const _NOTIFICATIONS_HTML_ID      = 'notifications';
const _NOTIFICATION_TIMEOUT       = 5000;
const _NOTIFICATIONS_TYPE_SUCCESS = 'success';
const _NOTIFICATIONS_TYPE_FAILURE = 'danger';
let notificationCount = 0;
const __notify = (message, type = _NOTIFICATIONS_TYPE_SUCCESS) => {
    let holder = document.getElementById(_NOTIFICATIONS_HTML_ID);
    if(isNull(holder)){
        append('body',`<div id='${_NOTIFICATIONS_HTML_ID}' class="fixed-bottom w-100"></div>`);
        holder = document.getElementById(_NOTIFICATIONS_HTML_ID);
    }
    notificationCount++;
    const notificationId = `notification-${notificationCount}`;
    append(`#${_NOTIFICATIONS_HTML_ID}`,`<div id='${notificationId}' class="notification text-center rounded m-3 text-light p-2 fs-5 bg-${type}">${message}</div>`);
    const notification = document.getElementById(notificationId);
    if(empty(window.timeouts)){
        window.timeouts = {};
    }
    window.timeouts[`notification-${notificationId}`] = setTimeout(function() {
        notification.remove(); 
        clearTimeout(window.timeouts[`notification-${notificationId}`]);
    },_NOTIFICATION_TIMEOUT);
    
    __eventListener(`#${notificationId}`,'click',() => {
        notification.remove();
        clearTimeout(window.timeouts[`notification-${notificationId}`]);
    })
};