document.addEventListener("DOMContentLoaded", function () {
    fetch('/website/data/raids.json')
        .then(response => response.json())
        .then(data => {
            const raidsTable = document.getElementById('raidsTable');
            data.raids.forEach(raid => {
                const raidElement = document.createElement('tr');
                raidElement.innerHTML = `
                <td>${raid.name}</td>
                <td>
                    <img src="${raid.img}" alt="${raid.name}">
                </td>
                <td>${raid.message}</td>
                <td>${raid.location}</td>
            `;
            raidsTable.appendChild(raidElement);
            });
        })
        .catch(error => console.error('Error loading raids:', error));
});