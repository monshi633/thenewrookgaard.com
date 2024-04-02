document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryNpcs');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('npcsTable');
        table.innerText = '';
        fetch('/data/npcs.json')
            .then(response => response.json())
            .then(data => {
                data.npcs.forEach(npc => {
                    const npcElement = document.createElement('tr');
                    npcElement.innerHTML = `
                    <td>${npc.name}</td>
                    <td>
                        <img src="${npc.img}" alt="${npc.name}">
                    </td>
                    <td>${npc.location}</td>
                    <td>${npc.services}</td>
                `;
                table.appendChild(npcElement);
                });
            })
            .catch(error => console.error('Error loading npcs:', error));
    });
});