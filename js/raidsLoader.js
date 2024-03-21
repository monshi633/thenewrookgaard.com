document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById('label__section__library__raids');

    label.addEventListener('click', function () {
        const table = document.getElementById('raidsTable');
        table.innerText = '';
        fetch('/data/raids.json')
            .then(response => response.json())
            .then(data => {
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
                table.appendChild(raidElement);
                });
            })
            .catch(error => console.error('Error loading raids:', error));
    });
});