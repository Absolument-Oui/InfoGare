var token;

function loginDiscord() {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=831974495216336903&redirect_uri="+location.toString().replace(':', '%3A').replaceAll('/', '%2F')+"&response_type=code&scope=identify%20email";
}

function checkCode() {
    var params = new URLSearchParams(location.search);
    if (params.has('code')) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://discord.com/api/v8/oauth2/token", false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('client_id=831974495216336903&client_secret=RFX9fBPHTwLnGJ60unnzc0KvcwW18J3q&grant_type=authorization_code&code='+params.get('code'));
        alert(xhr.responseText);
    }
}