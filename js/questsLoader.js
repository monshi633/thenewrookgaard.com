document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById('label__section__library__quests');

    label.addEventListener('click', function () {
        const table = document.getElementById('questsTable');
        table.innerText = '';
        fetch('/data/quests.json')
            .then(response => response.json())
            .then(data => {
                data.quests.forEach(quest => {
                    const row = table.insertRow();
                    Object.values(quest).forEach(value => {
                        const cell = row.insertCell();
                        cell.innerHTML = value;
                    });
                });
            })
            .catch(error => console.error('Error loading quests:', error));
    });
});