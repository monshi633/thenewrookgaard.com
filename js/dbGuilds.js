document.addEventListener('DOMContentLoaded', function () {
    const submenu = document.getElementById('submenuSectionCommunityGuilds');

    submenu.addEventListener('click', function () {
        const guildTable = document.getElementById('guildTable');
        guildTable.innerText = '';
        fetch('dbQueries.php?queryId=getGuilds')
        .then(response => response.json())
        .then(data => {
            data.forEach(guild => {
                const guildName = guild.name;

                // Add guild row
                const guildRow = document.createElement('tr');
                guildRow.innerHTML = `
                <thead>
                    <tr>
                        <td>${guildName}</td>
                        <td>${guild.members}</td>
                        <td>${guild.creation}</td>
                    <tr>
                </thead>
                `;
                guildTable.appendChild(guildRow);
                
                // Define membersBodyId
                const membersBodyId = guildName + 'membersBody'

                // Add member row
                const membersRow = document.createElement('tr');
                membersRow.classList.add('separator')
                membersRow.innerHTML = `
                <td></td>
                <td colspan="2" style="padding: 0; border: 0;">
                    <table id="${membersBodyId}" class="listed-table sub fixed_width">
                        <tr>
                            <th>Name</th>
                            <th>Rank</th>
                            <th style="width: 60px;">Online?</th>
                        </tr>
                    </table>
                </td>
                `;
                guildTable.appendChild(membersRow);
                
                // Define membersRowId
                const membersRowId = guildName + 'Collapsable';
                membersRow.id = membersRowId;

                // Add onclick attribute to hide members
                guildRow.setAttribute('onclick', 'collapseTable("' + membersRowId + '", true)');
                guildRow.style.cursor = 'pointer';

                // Add content to membersBody
                fetch(`dbQueries.php?queryId=getGuildMembers&inputValue=${guildName}`)
                .then(response => response.json())
                .then(data => {
                    const membersTable = document.getElementById(membersBodyId);
                    data.forEach(member => {
                        var onlineIcon = '<img src="images/'
                        if (member.online == 1) {
                            onlineIcon = onlineIcon + 'icon_yes.png" alt="Online">'
                        } else {
                            onlineIcon = onlineIcon + 'icon_no.png" alt="Offline">'
                        }

                        const memberRow = document.createElement('tr');
                        memberRow.innerHTML = `
                        <td>${member.name}</td>
                        <td>${member.rank}</td>
                        <td>${onlineIcon}</td>
                        `;
                        membersTable.appendChild(memberRow);
                    });
                })
                .catch(error => console.error('Error loading members:', error));
            });
        })
        .catch(error => console.error('Error loading guilds:', error));
    });
});