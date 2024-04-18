document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryItems');
    
    submenu.addEventListener('click', function () {
        const helmetsTable = document.getElementById('helmetsTable');
        helmetsTable.innerText = '';
        const armorsTable = document.getElementById('armorsTable');
        armorsTable.innerText = '';
        const legsTable = document.getElementById('legsTable');
        legsTable.innerText = '';
        const bootsTable = document.getElementById('bootsTable');
        bootsTable.innerText = '';
        const shieldsTable = document.getElementById('shieldsTable');
        shieldsTable.innerText = '';
        const magicTable = document.getElementById('magicTable');
        magicTable.innerText = '';
        const clubTable = document.getElementById('clubTable');
        clubTable.innerText = '';
        const swordTable = document.getElementById('swordTable');
        swordTable.innerText = '';
        const axeTable = document.getElementById('axeTable');
        axeTable.innerText = '';
        const distanceTable = document.getElementById('distanceTable');
        distanceTable.innerText = '';
        const ammunitionTable = document.getElementById('ammunitionTable');
        ammunitionTable.innerText = '';
        const amuletsTable = document.getElementById('amuletsTable');
        amuletsTable.innerText = '';
        const ringsTable = document.getElementById('ringsTable');
        ringsTable.innerText = '';
        const containersTable = document.getElementById('containersTable');
        containersTable.innerText = '';
        const recipesTable = document.getElementById('recipesTable');
        recipesTable.innerText = '';
        fetch('/data/items.json')
            .then(response => response.json())
            .then(data => {
                // Helmets
                data.helmets.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                helmetsTable.appendChild(row);
                });
                // Armors
                data.armors.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                armorsTable.appendChild(row);
                });
                // Legs
                data.legs.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                legsTable.appendChild(row);
                });
                // Boots
                data.boots.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                bootsTable.appendChild(row);
                });
                // Shields
                data.shields.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.def}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                shieldsTable.appendChild(row);
                });
                // Magic Weapons
                data.magic.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td>${item.element}</td>
                    <td style="text-align: center;">${item.damage}</td>
                    <td style="text-align: center;">${item.range}</td>
                    <td style="text-align: center;">${item.mana}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                magicTable.appendChild(row);
                });
                // Club Weapons
                data.club.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.atk}</td>
                    <td style="text-align: center;">${item.def}</td>
                    <td style="text-align: center;">${item.hands}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                clubTable.appendChild(row);
                });
                // Sword Weapons
                data.sword.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.atk}</td>
                    <td style="text-align: center;">${item.def}</td>
                    <td style="text-align: center;">${item.hands}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                swordTable.appendChild(row);
                });
                // Axe Weapons
                data.axe.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.atk}</td>
                    <td style="text-align: center;">${item.def}</td>
                    <td style="text-align: center;">${item.hands}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                axeTable.appendChild(row);
                });
                // Distance Weapons
                data.distance.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.atk}</td>
                    <td style="text-align: center;">${item.range}</td>
                    <td style="text-align: center;">${item.hands}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.level}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                distanceTable.appendChild(row);
                });
                // Ammunition
                data.ammunition.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.atk}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                ammunitionTable.appendChild(row);
                });
                // Amulets
                data.amulets.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                amuletsTable.appendChild(row);
                });
                // Rings
                data.rings.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.arm}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                ringsTable.appendChild(row);
                });
                // Containers
                data.containers.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td style="text-align: center;">${item.slots}</td>
                    <td>${item.additional}</td>
                    <td style="text-align: center;">${item.weight}</td>
                    <td>${item.obtained}</td>
                `;
                containersTable.appendChild(row);
                });
                // Recipes
                data.recipes.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td>${item.effect}</td>
                    <td style="text-align: center;">${item.weight}</td>
                `;
                recipesTable.appendChild(row);
                });
            })
            .catch(error => console.error('Error loading items:', error));
    });
});