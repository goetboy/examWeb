/**
 * 写入Cookie
 * @param {string} name 
 * @param {*} value 
 * @param {*} days 
 */
export function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}



/**
 * 
 * 
 
setCookie('ppkcookie','testcookie',7);

var x = getCookie('ppkcookie');
if (x) {
    [do something with x]
}

 */