document.addEventListener("DOMContentLoaded", function () {
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
        fetch("query.php?query=SELECT name, CASE WHEN promotion = 0 THEN 'Rookie' WHEN promotion = 1 THEN 'Rookstayer' END AS vocation, level, experience FROM players WHERE id > 2 AND group_id < 3 ORDER BY experience DESC LIMIT 50")
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
        fetch("query.php?query=SELECT name, CASE WHEN promotion = 0 THEN 'Rookie' WHEN promotion = 1 THEN 'Rookstayer' END AS vocation, maglevel, manaspent FROM players WHERE id > 2 AND group_id < 3 ORDER BY maglevel DESC, manaspent DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=0 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=1 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=2 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=3 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=4 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=5 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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
        fetch("query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN 'Rookie' WHEN p.promotion = 1 THEN 'Rookstayer' END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=6 ORDER BY ps.value DESC, p.level DESC LIMIT 50")
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