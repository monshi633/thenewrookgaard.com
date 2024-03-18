document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT g.name, p_leader.name AS leader, COUNT(p.name) AS members ,strftime("%d-%m-%Y", datetime(g.creationdata, "unixepoch")) AS creation FROM guilds AS g JOIN players AS p_leader ON g.ownerid=p_leader.id JOIN guild_ranks as r ON g.id = r.guild_id JOIN players as p on r.id=p.rank_id GROUP BY g.name, p_leader.name, g.creationdata ORDER BY g.creationdata')
    .then(response => response.json())
    .then(data => {
        const guildTable = document.getElementById('guildTable');
        data.forEach(guild => {
                let guildName = guild.name;
                const leaderRow = document.createElement('tr');
                leaderRow.innerHTML = `
                <td>${guildName}</td>
                <td>${guild.leader}</td>
                <td>${guild.members}</td>
                <td>${guild.creation}</td>
                <table id="${guildName}SubTable" class="listed__table sub">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                `;
                guildTable.appendChild(leaderRow);
            
                fetch('query.php?query=SELECT p.name AS member, r.name AS rank FROM players AS p JOIN guild_ranks as r ON p.rank_id = r.id JOIN guilds as g ON g.id = r.guild_id WHERE g.name = ' + encodeURIComponent(guildName))
                .then(response => response.json())
                .then(data => {
                    const guildSubTable = document.getElementById(guildName + 'SubTable');
                    data.forEach(guildMember => {
                            const row = guildSubTable.insertRow();
                            ['member', 'rank'].forEach(key => {
                                const cell = row.insertCell();
                                cell.innerHTML = guildMember[key];
                        });
                    });
                })
                .catch(error => console.error('Error loading guildmembers:', error));
            });
        })
        .catch(error => console.error('Error loading guilds:', error));
});