var messages = firebase.messaging();

messages.onMessage((payload) => {
    console.log('Nouveau message' + payload)
});