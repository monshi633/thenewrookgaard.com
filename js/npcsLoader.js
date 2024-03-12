document.addEventListener("DOMContentLoaded", function () {
    fetch('/website/data/npcs.json')
        .then(response => response.json())
        .then(data => {
            const npcsTable = document.getElementById('npcsTable');
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
            npcsTable.appendChild(npcElement);
            });
        })
        .catch(error => console.error('Error loading npcs:', error));
});