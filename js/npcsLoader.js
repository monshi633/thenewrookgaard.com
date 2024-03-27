document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryNpcs');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('npcsTable');
        table.innerText = '';
        fetch('/data/npcs.json')
            .then(response => response.json())
            .then(data => {
                data.npcs.forEach(npc => {
                    const row = table.insertRow();
                    Object.values(npc).forEach(value => {
                        const cell = row.insertCell();
                        cell.innerHTML = value;
                    });
                });
            })
            .catch(error => console.error('Error loading npcs:', error));
    });
});