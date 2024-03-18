document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT g.name, COUNT(p.name) AS members ,strftime("%d-%m-%Y", datetime(g.creationdata, "unixepoch")) AS creation FROM guilds AS g JOIN players AS p_leader ON g.ownerid=p_leader.id JOIN guild_ranks as r ON g.id = r.guild_id JOIN players as p on r.id=p.rank_id GROUP BY g.name ORDER BY g.creationdata')
        .then(response => response.json())
        .then(data => {
            const guildTable = document.getElementById('guildTable');
            data.forEach(guild => {
                // Add guild row
                const guildRow = document.createElement('tr');
                guildRow.innerHTML = `
                <td>${guild.name}</td>
                <td>${guild.members}</td>
                <td>${guild.creation}</td>
                `;
                guildTable.appendChild(guildRow);

                // Define membersBodyId
                const membersBodyId = guild.name + 'membersBody'

                // Add member row
                const membersRow = document.createElement('tr');
                membersRow.innerHTML = `
                <td></td>
                <td colspan="2" style="padding: 0; border: 0;">
                    <table id="${membersBodyId}" class="listed__table sub fixed_width">
                        <tr>
                            <th>Name</th>
                            <th>Rank</th>
                        </tr>
                    </table>
                </td>
                `;
                guildTable.appendChild(membersRow);

                // Define membersRowId
                const membersRowId = guild.name + 'Collapsable';
                membersRow.id = membersRowId;

                // Add onclick attribute to hide members
                guildRow.setAttribute('onclick', 'collapseTable("' + membersRowId + '", true)');

                // Add content to membersBody
                fetch('query.php?query=SELECT p.name AS name, r.name AS rank FROM players AS p JOIN guild_ranks AS r ON p.rank_id = r.id WHERE r.guild_id = (SELECT id FROM guilds WHERE name = "' + guild.name + '");')
                    .then(response => response.json())
                    .then(data => {
                        const membersTable = document.getElementById(membersBodyId);
                        data.forEach(member => {
                            const memberRow = document.createElement('tr');
                            memberRow.innerHTML = `
                            <td>${member.name}</td>
                            <td>${member.rank}</td>
                        `;
                            membersTable.appendChild(memberRow);
                        });
                    })
                    .catch(error => console.error('Error loading members:', error));
            });
        })
        .catch(error => console.error('Error loading guilds:', error));
});