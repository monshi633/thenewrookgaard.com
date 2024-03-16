document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/npcs.json')
        .then(response => response.json())
        .then(data => {
            const npcsTable = document.getElementById('npcsTable');
            data.npcs.forEach(npc => {
                const row = npcsTable.insertRow();
                Object.values(npc).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
        })
        .catch(error => console.error('Error loading npcs:', error));
});