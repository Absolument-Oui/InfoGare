const COMMITS_API = "https://api.github.com/repos/Absolument-Oui/InfoGare/commits?per_page=1000";
const COMMITS_API_BETA = "https://api.github.com/repos/Absolument-Oui/InfoGare-Beta/commits?per_page=1000";
var req = new XMLHttpRequest();

function getVersion() {
    if (location.pathname==="infogare.fr"){
        req.open('GET', COMMITS_API, false);
        req.onload = ((e) => {
            var response = JSON.parse(req.response);
            var item = response[0];
            var message = item.commit.message;
            console.log(message);
            var version = message.split('\n');
    
            document.getElementById('version').innerText = version[0];
        });
        req.send('');
    }
    if (location.pathname==="beta.infogare.fr"){
        req.open('GET', COMMITS_API_BETA, false);
        req.onload = ((e) => {
            var response = JSON.parse(req.response);
            var item = response[0];
            var message = item.commit.message;
            console.log(message);
            var version = message.split('\n');
    
            document.getElementById('version').innerText = version[0];
        });
        req.send('');
    }
}

function getAllVersions() {
    var response = JSON.parse(req.response);
    for(let i = 0; i < response.length; i++) {
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');

        var title = response[i].commit.message.split('\n')[0];
        var message = response[i].commit.message.slice(title.length, response[i].commit.message.length);
        var commit_date = new Date(response[i].commit.author.date);

        h1.innerText = `${title} (${commit_date.toLocaleDateString()})`;
        p.innerText = message;
        div.appendChild(h1);
        div.appendChild(p);

        document.getElementById('versions').appendChild(div);
    };
}