document.addEventListener("DOMContentLoaded", function () {
    fetch('/website/data/items.json')
        .then(response => response.json())
        .then(data => {
            // Helmets
            const helmetsTable = document.getElementById('helmetsTable');
            data.helmets.forEach(item => {
                const row = helmetsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Armors
            const armorsTable = document.getElementById('armorsTable');
            data.armors.forEach(item => {
                const row = armorsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Legs
            const legsTable = document.getElementById('legsTable');
            data.legs.forEach(item => {
                const row = legsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Boots
            const bootsTable = document.getElementById('bootsTable');
            data.boots.forEach(item => {
                const row = bootsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Shields
            const shieldsTable = document.getElementById('shieldsTable');
            data.shields.forEach(item => {
                const row = shieldsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Club Weapons
            const clubTable = document.getElementById('clubTable');
            data.club.forEach(item => {
                const row = clubTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Sword Weapons
            const swordTable = document.getElementById('swordTable');
            data.sword.forEach(item => {
                const row = swordTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Axe Weapons
            const axeTable = document.getElementById('axeTable');
            data.axe.forEach(item => {
                const row = axeTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Distance Weapons
            const distanceTable = document.getElementById('distanceTable');
            data.distance.forEach(item => {
                const row = distanceTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Ammunition
            const ammunitionTable = document.getElementById('ammunitionTable');
            data.ammunition.forEach(item => {
                const row = ammunitionTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Amulets
            const amuletsTable = document.getElementById('amuletsTable');
            data.amulets.forEach(item => {
                const row = amuletsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Rings
            const ringsTable = document.getElementById('ringsTable');
            data.rings.forEach(item => {
                const row = ringsTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Containers
            const containersTable = document.getElementById('containersTable');
            data.containers.forEach(item => {
                const row = containersTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
            // Recipes
            const recipesTable = document.getElementById('recipesTable');
            data.recipes.forEach(item => {
                const row = recipesTable.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
        })
        .catch(error => console.error('Error loading items:', error));
});