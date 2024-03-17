document.addEventListener("DOMContentLoaded", function () {
    fetch('query.php?query=SELECT h.name, h.size, CAST(h.price / 1000 AS TEXT) || "k gold" AS kprice, COALESCE(p.name, "<mark>Available</mark>") AS status FROM houses AS h LEFT JOIN players AS p ON h.owner=p.id ORDER BY h.name')
        .then(response => response.json())
        .then(data => {
            const houseTable = document.getElementById('houseTable');
            data.forEach(house => {
                const row = houseTable.insertRow();
                ['name', 'size', 'kprice', 'status'].forEach(key => {
                    const cell = row.insertCell();
                    cell.innerHTML = house[key];
                });
            });
        })
        .catch(error => console.error('Error loading houses:', error));
});