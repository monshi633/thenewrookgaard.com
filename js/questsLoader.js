document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/quests.json')
        .then(response => response.json())
        .then(data => {
            const questsTable = document.getElementById('questsTable');
            data.quests.forEach(quest => {
                const row = questsTable.insertRow();
                Object.values(quest).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
        })
        .catch(error => console.error('Error loading quests:', error));
});