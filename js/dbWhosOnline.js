document.addEventListener('DOMContentLoaded', function () {
    function loadWhosOnline() {
        const onlineTable = document.getElementById('onlineTable');
        onlineTable.innerText = '';

        fetch('dbQueries.php?queryId=whosOnline')
            .then(response => response.json())
            .then(data => {
                data.forEach(player => {
                    const row = onlineTable.insertRow();
                    ['name', 'vocation', 'level', 'guild'].forEach(key => {
                        const cell = row.insertCell();
                        cell.innerHTML = player[key];
                    });
                });
            })
            .catch(error => console.error('Error loading players online:', error));
    }

    const submenu = document.getElementById('submenuSectionCommunityWhosonline');
    const counter = document.getElementById('counter');

    submenu.addEventListener('click', loadWhosOnline);
    counter.addEventListener('click', loadWhosOnline);
});