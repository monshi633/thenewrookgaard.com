document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibrarySpells');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('spellsTable');
        table.innerText = '';
        fetch('/data/spells.json')
            .then(response => response.json())
            .then(data => {
                data.spells.forEach(spell => {
                    const row = table.insertRow();
                    Object.values(spell).forEach(value => {
                        const cell = row.insertCell();
                        cell.innerHTML = value;
                    });
                });
            })
            .catch(error => console.error('Error loading spells:', error));
    });
});