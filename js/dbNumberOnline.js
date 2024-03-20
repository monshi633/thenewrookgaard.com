// document.addEventListener("DOMContentLoaded", function () {
//     fetch('query.php?query=SELECT COUNT (*) AS players_online FROM players WHERE online = 1 AND id > 2')
//         .then(response => response.json())
//         .then(data => {
//             const numberOnline = document.getElementById('numberOnline');
//             const count = data[0].players_online;
//             numberOnline.innerText = count + (count === 1 ? ' Player Online' : ' Players Online');
//         })
//         .catch(error => console.error('Error loading online amount:', error));
// });
document.addEventListener("DOMContentLoaded", function () {
    const numberOnline = document.getElementById('numberOnline');

    // Create WebSocket connection
    const socket = new WebSocket('ws://localhost:8080');

    // Connection opened event handler
    socket.addEventListener('open', function (event) {
        console.log('WebSocket connection established');
    });

    // Message event handler
    socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);
        const count = data.players_online;
        numberOnline.innerText = count + (count === 1 ? ' Player Online' : ' Players Online');
    });

    // Error event handler
    socket.addEventListener('error', function (event) {
        console.error('WebSocket error:', event);
    });
});
