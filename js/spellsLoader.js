document.addEventListener("DOMContentLoaded", function () {
    fetch('/website/data/spells.json')
        .then(response => response.json())
        .then(data => {
            const spellsTable = document.getElementById('spellsTable');
            data.spells.forEach(spell => {
                const row = spellsTable.insertRow();
                Object.values(spell).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
        })
        .catch(error => console.error('Error loading spells:', error));
});