document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryTasks');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('tasksTable');
        table.innerText = '';
        fetch('/data/tasks.json')
            .then(response => response.json())
            .then(data => {
                data.tasks.forEach(task => {
                    const row = table.insertRow();
                    Object.values(task).forEach(value => {
                        const cell = row.insertCell();
                        cell.innerHTML = value;
                    });
                });
            })
            .catch(error => console.error('Error loading tasks:', error));
    });
});