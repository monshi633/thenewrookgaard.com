document.addEventListener('DOMContentLoaded', function () {
    const submenu = document.getElementById('submenuSectionCommunityHighscores');

    submenu.addEventListener('click', function () {
        const levelTable = document.getElementById('levelTable');
        levelTable.innerText = '';
        const magicLevelTable = document.getElementById('magicLevelTable');
        magicLevelTable.innerText = '';
        const fistFightingTable = document.getElementById('fistFightingTable');
        fistFightingTable.innerText = '';
        const clubFightingTable = document.getElementById('clubFightingTable');
        clubFightingTable.innerText = '';
        const swordFightingTable = document.getElementById('swordFightingTable');
        swordFightingTable.innerText = '';
        const axeFightingTable = document.getElementById('axeFightingTable');
        axeFightingTable.innerText = '';
        const distanceFightingTable = document.getElementById('distanceFightingTable');
        distanceFightingTable.innerText = '';
        const shieldingTable = document.getElementById('shieldingTable');
        shieldingTable.innerText = '';
        const fishingTable = document.getElementById('fishingTable');
        fishingTable.innerText = '';

        // Level
        fetch('dbQueries.php?queryId=hLevel')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = levelTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'experience'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading level highscores:', error));
        
        // Magic Level
        fetch('dbQueries.php?queryId=hMagic')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = magicLevelTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'maglevel', 'manaspent'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading magic level highscores:', error));
        
        // Fist
        fetch('dbQueries.php?queryId=hFist')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = fistFightingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading fist highscores:', error));

        // Club
        fetch('dbQueries.php?queryId=hClub')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = clubFightingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading club highscores:', error));

        // Sword
        fetch('dbQueries.php?queryId=hSword')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = swordFightingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading sword highscores:', error));

        // Axe
        fetch('dbQueries.php?queryId=hAxe')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = axeFightingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading axe highscores:', error));

        // Distance
        fetch('dbQueries.php?queryId=hDistance')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = distanceFightingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading distance highscores:', error));

        // Shielding
        fetch('dbQueries.php?queryId=hShielding')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = shieldingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading shielding highscores:', error));

        // Fishing
        fetch('dbQueries.php?queryId=hFishing')
            .then(response => response.json())
            .then(data => {
                let index = 1;
                data.forEach(player => {
                    const row = fishingTable.insertRow();
                    const indexCell = row.insertCell();
                    indexCell.innerHTML = index++;
                    ['name', 'vocation', 'level', 'value'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading fishing highscores:', error));
    });
});