document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById('label__section__community__houses');

    label.addEventListener('click', function () {
        const table = document.getElementById('housesTable');
        table.innerText = '';
        fetch("query.php?query=SELECT h.name, h.size, CAST(h.price / 1000 AS TEXT) || '.000' AS price, COALESCE(p.name, '<i><b>Available</b></i>') AS status FROM houses AS h LEFT JOIN players AS p ON h.owner=p.id ORDER BY h.name")
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