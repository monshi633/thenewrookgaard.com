document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT COUNT (*) AS players_online FROM players WHERE online = 1')
        .then(response => response.json())
        .then(data => {
            const playersOnline = document.getElementById('playersOnline');
            const count = data[0].players_online;
            playersOnline.innerText = count + ' Players Online';
        })
        .catch(error => console.error('Error:', error));
});