function loadCharacter(charName) {
    // Get character name
    var characterName = '';
    if (typeof charName === 'undefined') {
        characterName = sanitizeInput(capitalizeWords(document.getElementById('characterName').value));
        if (characterName.trim() === '') {
            return false;
        }
    } else {
        characterName = sanitizeInput(capitalizeWords(charName));
    }

    // Clear input field
    document.getElementById('characterName').value = '';
    charactersDisplayReset()
    
    // Validate character name
    characterExists(characterName);

    // Load Character Info
    const characterInfoTable = document.getElementById('characterInfoTable');
    characterInfoTable.innerText = '';
    fetch(`dbQueries.php?queryId=character&inputValue=${characterName}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(characterInfo => {
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

                // Load Characters
                const charactersTable = document.getElementById('charactersTable');
                charactersTable.innerText = '';
                fetch(`dbQueries.php?queryId=cAccount&inputValue=${characterInfo.account_id}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(character => {
                            var onlineIcon = '<img src="images/'
                            if (character.online == 1) {
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
                                <div class="inputbox__buttonfield">
                                    <input type="submit" value="View" onclick="loadCharacter('${character.name}')">
                                </div>
                            </td>
                            `;
                            charactersTable.appendChild(characterRow);
                        });
                    })
                    .catch(error => console.error('Error loading characters list:', error));
            });
        })
        .catch(error => {
            console.error('Error loading character info:', error);
            charactersDisplayReset();
            charactersDisplayError(characterName);
    });
}

function sanitizeInput(input) {
    // Allow only alphanumeric characters
    return input.replace(/[^a-zA-Z]/g, '');
}

function capitalizeWords(string) {
    // Split the string into an array of words
    const words = string.split(' ');
    
    // Capitalize the first letter of each word and convert the rest to lowercase
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    // Join the words back into a single string
    return capitalizedWords.join(' ');
}

function charactersDisplayReset() {
    document.getElementById('characterNotFoundMessage').innerHTML = '';
    document.getElementById('characterNotFound').style.display = 'none';
    document.getElementById('characterInfo').style.display = 'none';
    document.getElementById('characters').style.display = 'none';
}

function charactersDisplayError(characterName) {
    document.getElementById('characterNotFoundMessage').innerHTML = `<td>Character <b>${characterName}</b> does not exist.</td>`
    document.getElementById('characterNotFound').style.display = 'block';
}

function characterExists(characterName) {
    fetch(`dbQueries.php?queryId=cExists&inputValue=${characterName}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0 && data[0].count > 0) {
                // Character name exists in the database
                // Display articles
                document.getElementById('characterInfo').style.display = 'block';
                document.getElementById('characters').style.display = 'block';
                return true;
            } else {
                // Character name doesn't exist in the database
                charactersDisplayError(characterName);
                return false;
            }
        })
        .catch(error => {
            console.error('Error validating character:', error);
        });
}