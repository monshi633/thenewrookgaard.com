document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryAddons');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('addonsTable');
        table.innerText = '';
        fetch('/data/addons.json')
            .then(response => response.json())
            .then(data => {
                data.addons.forEach(addon => {
                    const addonElement = document.createElement('tr');
                    addonElement.innerHTML = `
                    <td>${addon.name}</td>
                    <td>
                        <img src="${addon.img1}" alt="${addon.name} male">
                        <img src="${addon.img2}" alt="${addon.name} female">
                    </td>
                    <td>${addon.items}</td>
                `;
                table.appendChild(addonElement);
                });
            })
            .catch(error => console.error('Error loading addons:', error));
    });
});