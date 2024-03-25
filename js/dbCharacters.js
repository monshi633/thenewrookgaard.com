function loadCharacter(charName) {
    // Get character name
    var characterName = '';
    if (typeof charName === 'undefined') {
        characterName = document.getElementById('characterName').value;
    } else {
        characterName = charName;
    }

    // Clear input field
    document.getElementById('characterName').value = '';

    // Variable to store player id
    var accountId = 0;

    // Load Character Info
    const characterInfoTable = document.getElementById('characterInfoTable');
    characterInfoTable.innerText = '';
    fetch('query.php?query=SELECT p.account_id, p.name, CASE WHEN p.rank_id = 0 THEN "-" ELSE g.name END AS guild, CASE WHEN p.rank_id = 0 THEN "" ELSE " (" || r.name || ")" END AS rank, CASE WHEN p.sex = 1 THEN "Male" WHEN p.sex = 0 THEN "Female" END AS sex, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, strftime("%d-%m-%Y", datetime(p.lastlogin, "unixepoch")) AS lastlogin, CASE WHEN a.premdays > 0 THEN "Premium Account" ELSE "Free Account" END AS status FROM players AS p LEFT JOIN accounts AS a ON p.account_id = a.id LEFT JOIN guild_ranks AS r ON p.rank_id = r.id LEFT JOIN guilds AS g ON r.guild_id = g.id WHERE p.name = "' + characterName + '"')
    .then(response => response.json())
    .then(data => {
        data.forEach(characterInfo => {
            accountId = characterInfo.account_id;
            const infoBody = document.createElement('tbody');
            infoBody.innerHTML = `
            <tr>
                <th>Name</th>
                <td>${characterInfo.name}</td>
            </tr>
            <tr>
                <th>Guild</th>
                <td>${characterInfo.guild}${characterInfo.rank}</td>
            </tr>
            <tr>
                <th>Sex</th>
                <td>${characterInfo.sex}</td>
            </tr>
            <tr>
                <th>Vocation</th>
                <td>${characterInfo.vocation}</td>
            </tr>
            <tr>
                <th>Level</th>
                <td>${characterInfo.level}</td>
            </tr>
            <tr>
                <th>Last Login</th>
                <td>${characterInfo.lastlogin}</td>
            </tr>
            <tr>
                <th>Account Status</th>
                <td>${characterInfo.status}</td>
            </tr>
            `;
            characterInfoTable.appendChild(infoBody);
        });
    })
    .catch(error => console.error('Error loading character info:', error));

    // Load Characters
    const charactersTable = document.getElementById('charactersTable');
    charactersTable.innerText = '';
    fetch('query.php?query=SELECT p.name, p.level, p.online AS status FROM players AS p JOIN accounts AS a ON p.account_id = a.id WHERE p.account_id = ' + accountId)
    .then(response => response.json())
    .then(data => {
        data.forEach(character => {
            var onlineIcon = '<img src="images/'
            if (character.online === 1) {
                onlineIcon = onlineIcon + 'icon_yes.png" alt="Online">'
            } else {
                onlineIcon = onlineIcon + 'icon_no.png" alt="Offline">'
            }

            const characterRow = document.createElement('tr');
            characterRow.innerHTML = `
            <td>${character.name}</td>
            <td>${character.level}</td>
            <td>${onlineIcon}</td>
            <td>
                <div class="loginbutton__buttonfield">
                    <input type="submit" value="Submit" onclick="loadCharacter(${character.name})">
                </div>
            </td>
            `;
            charactersTable.appendChild(characterRow);
        });
    })
    .catch(error => console.error('Error loading characters:', error));
}