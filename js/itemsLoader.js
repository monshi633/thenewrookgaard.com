document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/items.json')
        .then(response => response.json())
        .then(data => {
            // Helmets
            const helmetsTable = document.getElementById('helmetsTable');
            data.helmets.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.def}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Armors
            const armorsTable = document.getElementById('armorsTable');
            data.armors.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.arm}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Legs
            const legsTable = document.getElementById('legsTable');
            data.legs.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.arm}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Boots
            const bootsTable = document.getElementById('bootsTable');
            data.boots.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.arm}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Shields
            const shieldsTable = document.getElementById('shieldsTable');
            data.shields.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.def}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Club Weapons
            const clubTable = document.getElementById('clubTable');
            data.club.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.atk}</td>
                <td>${item.def}</td>
                <td>${item.hands}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Sword Weapons
            const swordTable = document.getElementById('swordTable');
            data.sword.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.atk}</td>
                <td>${item.def}</td>
                <td>${item.hands}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Axe Weapons
            const axeTable = document.getElementById('axeTable');
            data.axe.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.atk}</td>
                <td>${item.def}</td>
                <td>${item.hands}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Distance Weapons
            const distanceTable = document.getElementById('distanceTable');
            data.distance.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.atk}</td>
                <td>${item.range}</td>
                <td>${item.hands}</td>
                <td>${item.additional}</td>
                <td>${item.level}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Ammunition
            const ammunitionTable = document.getElementById('ammunitionTable');
            data.ammunition.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.atk}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Amulets
            const amuletsTable = document.getElementById('amuletsTable');
            data.amulets.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.arm}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Rings
            const ringsTable = document.getElementById('ringsTable');
            data.rings.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.arm}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Containers
            const containersTable = document.getElementById('containersTable');
            data.containers.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.slots}</td>
                <td>${item.additional}</td>
                <td>${item.weight}</td>
                <td>${item.obtained}</td>
            `;
                itemsTable.appendChild(row);
            });
            // Recipes
            const recipesTable = document.getElementById('recipesTable');
            data.recipes.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                </td>
                <td>${item.effect}</td>
                <td>${item.weight}</td>
            `;
                itemsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading items:', error));
});