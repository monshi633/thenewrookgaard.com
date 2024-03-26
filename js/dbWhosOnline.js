document.addEventListener("DOMContentLoaded", function () {
    function loadWhosOnline() {
        const onlineTable = document.getElementById('onlineTable');
        onlineTable.innerText = '';

        fetch("query.php?query=SELECT p.name, p.level, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, COALESCE(g.name, '-') AS guild FROM players AS p LEFT JOIN guild_ranks as r ON p.rank_id = r.id LEFT JOIN guilds AS g ON r.guild_id = g.id WHERE p.online = 1 AND p.id > 2 ORDER BY p.experience DESC")
            .then(response => response.json())
            .then(data => {
                data.forEach(player => {
                    const row = onlineTable.insertRow();
                    ['name', 'vocation', 'level', 'guild'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading players online:', error));
    }

    const label = document.getElementById('label__section__community__whosonline');
    const counter = document.getElementById('counter');

    label.addEventListener('click', loadWhosOnline);
    counter.addEventListener('click', loadWhosOnline);
});