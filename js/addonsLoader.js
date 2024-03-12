document.addEventListener("DOMContentLoaded", function () {
    fetch('/website/data/addons.json')
        .then(response => response.json())
        .then(data => {
            const addonsTable = document.getElementById('addonsTable');
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
            addonsTable.appendChild(addonElement);
            });
        })
        .catch(error => console.error('Error loading addons:', error));
});