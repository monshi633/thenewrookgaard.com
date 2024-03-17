document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT name, level, CASE WHEN promotion = 0 THEN "Rookie" WHEN promotion = 1 THEN "Rookstayer" END AS vocation FROM players WHERE online = 1 AND id > 2 ORDER BY experience DESC')
        .then(response => response.json())
        .then(data => {
            const onlineTable = document.getElementById('onlineTable');
            data.forEach(player => {
                const row = onlineTable.insertRow();
                ['name', 'level', 'vocation'].forEach(key => {
                    const cell = row.insertCell();
                    cell.innerHTML = player[key];
                });
            });
        })
        .catch(error => console.error('Error loading players online:', error));
});