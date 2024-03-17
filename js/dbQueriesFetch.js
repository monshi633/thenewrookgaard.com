document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT COUNT (*) AS players_online FROM players WHERE online = 1')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const playersOnline = document.getElementById('playersOnline');
            const count = data[0].players_online;
            playersOnline.innerText = count + (count === 1 ? 'Player Online' : 'Players Online');
        })
        .catch(error => console.error('Error:', error));
});