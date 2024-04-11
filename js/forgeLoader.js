document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryForge');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('forgeTable');
        table.innerText = '';
        fetch('/data/forge.json')
            .then(response => response.json())
            .then(data => {
                data.forge.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>
                    <img src="${item.img1}" alt="${item.name}">
                    </td>
                    <td>${item.name}</td>
                    <td style="text-align: center;">${item.amount}</td>
                    <td>
                    <img src="${item.img2}" alt="${item.reward}">
                    </td>
                    <td>${item.reward}</td>
                `;
                table.appendChild(row);
            });
            })
            .catch(error => console.error('Error loading forge:', error));
    });
});