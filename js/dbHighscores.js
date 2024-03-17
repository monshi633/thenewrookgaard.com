document.addEventListener("DOMContentLoaded", function () {
    // Level
    fetch('query.php?query=SELECT name, CASE WHEN promotion = 0 THEN "Rookie" WHEN promotion = 1 THEN "Rookstayer" END AS vocation, level, experience FROM players WHERE id > 2 AND group_id < 3 ORDER BY experience DESC LIMIT 50')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('levelTable');
            let index = 1;
            data.forEach(player => {
                const row = table.insertRow();
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
    fetch('query.php?query=SELECT name, CASE WHEN promotion = 0 THEN "Rookie" WHEN promotion = 1 THEN "Rookstayer" END AS vocation, maglevel, manaspent FROM players WHERE id > 2 AND group_id < 3 ORDER BY manaspent DESC LIMIT 50')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('magicLevelTable');
            let index = 1;
            data.forEach(player => {
                const row = table.insertRow();
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
    fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=0 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('fistFightingTable');
            let index = 1;
            data.forEach(player => {
                const row = table.insertRow();
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
        fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=1 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById('clubFightingTable');
                let index = 1;
                data.forEach(player => {
                    const row = table.insertRow();
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
            fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=2 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
                .then(response => response.json())
                .then(data => {
                    const table = document.getElementById('swordFightingTable');
                    let index = 1;
                    data.forEach(player => {
                        const row = table.insertRow();
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
                fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=3 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
                    .then(response => response.json())
                    .then(data => {
                        const table = document.getElementById('axeFightingTable');
                        let index = 1;
                        data.forEach(player => {
                            const row = table.insertRow();
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
                    fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=4 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
                        .then(response => response.json())
                        .then(data => {
                            const table = document.getElementById('distanceFightingTable');
                            let index = 1;
                            data.forEach(player => {
                                const row = table.insertRow();
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
                        fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=5 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
                            .then(response => response.json())
                            .then(data => {
                                const table = document.getElementById('shieldingTable');
                                let index = 1;
                                data.forEach(player => {
                                    const row = table.insertRow();
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
                            fetch('query.php?query=SELECT p.name, CASE WHEN p.promotion = 0 THEN "Rookie" WHEN p.promotion = 1 THEN "Rookstayer" END AS vocation, p.level, ps.value FROM players AS p JOIN player_skills AS ps ON p.id=ps.player_id WHERE p.id > 2 AND p.group_id < 3 AND ps.skillid=6 ORDER BY ps.value DESC, p.level DESC LIMIT 50')
                                .then(response => response.json())
                                .then(data => {
                                    const table = document.getElementById('fishingTable');
                                    let index = 1;
                                    data.forEach(player => {
                                        const row = table.insertRow();
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