const database = firebase.database().ref();

function checkClicked() {
    var params = new URLSearchParams(location.search);
    if (params.has('clicked')) {
        database.child('donation').update({
            count: firebase.database.ServerValue.increment(1) 
        }).then(() => {
            window.location.href = 'donation.htm';
        });
    } else {
        database.child('donation').get().then((snapshot) => {
            var money = snapshot.val().count * 0.002;
            document.getElementById('clicks').innerText = snapshot.val().count + ' publicités regardées';
            document.getElementById('money').innerText = money + ' € ont été collectés (environ)';
        });
    }
}