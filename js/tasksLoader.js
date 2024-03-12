document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/tasks.json')
        .then(response => response.json())
        .then(data => {
            const tasksTable = document.getElementById('tasksTable');
            data.tasks.forEach(task => {
                const row = tasksTable.insertRow();
                Object.values(task).forEach(value => {
                    const cell = row.insertCell();
                    cell.innerHTML = value;
                });
            });
        })
        .catch(error => console.error('Error loading tasks:', error));
});