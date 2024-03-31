document.addEventListener('DOMContentLoaded', function () {
    const submenu = document.getElementById('submenuSectionCommunityHouses');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('housesTable');
        table.innerText = '';
        fetch('dbQueries.php?queryId=houses')
        .then(response => response.json())
        .then(data => {
            data.forEach(house => {
                const row = table.insertRow();
                ['name', 'size', 'price', 'status'].forEach(key => {
                    const cell = row.insertCell();
                    cell.innerHTML = house[key];
                });
            });
        })
        .catch(error => console.error('Error loading houses:', error));
    });
});