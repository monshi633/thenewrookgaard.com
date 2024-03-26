document.addEventListener("DOMContentLoaded", function () {
    const numberOnline = document.getElementById('numberOnline');

    // Create EventSource object
    const eventSource = new EventSource("sse.php?query=SELECT COUNT (*) AS players_online FROM players WHERE online = 1 AND id > 2");

    // Event listener for receiving SSE updates
    eventSource.addEventListener('message', function(event) {
        const data = JSON.parse(event.data);
        const count = data.players_online;
        numberOnline.innerText = count + (count === 1 ? ' Player Online' : ' Players Online');
    });

    // Error event handler
    eventSource.addEventListener('error', function (error) {
        console.error('Error with SSE connection:', error);
        eventSource.close();
    });
});
