document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT g.name, p_leader.name AS leader, COUNT(p.name) AS members ,strftime("%d-%m-%Y", datetime(g.creationdata, "unixepoch")) AS creation FROM guilds AS g JOIN players AS p_leader ON g.ownerid=p_leader.id JOIN guild_ranks as r ON g.id = r.guild_id JOIN players as p on r.id=p.rank_id GROUP BY g.name, p_leader.name, g.creationdata ORDER BY g.creationdata')
        .then(response => response.json())
        .then(data => {
            const guildTable = document.getElementById('guildTable');
            data.forEach(house => {
                const row = guildTable.insertRow();
                ['name', 'leader', 'members', 'creation'].forEach(key => {
                    const cell = row.insertCell();
                    cell.innerHTML = house[key];
                });
            });
        })
        .catch(error => console.error('Error loading houses:', error));
});