function clock() {
    date = new Date;
    date.setHours(date.getHours() + (date.getTimezoneOffset() / -60));

    h = date.getUTCHours();
    if (h < 10) {
        h = '0' + h;
    }
    $('.hours').html(h);


    m = date.getUTCMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    $('.minutes').html(m);


    s = date.getUTCSeconds();
    if (s < 10) {
        s = '0' + s;
    }
    $('.seconds').html(s);


    setTimeout('clock("clock");', '1000');
    return true;
}

clock();