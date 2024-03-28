document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryBosses');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('bossesFlex');
        table.innerText = '';
        fetch('/data/bosses.json')
            .then(response => response.json())
            .then(data => {
                data.bosses.forEach(boss => {
                    const bossElement = document.createElement('div');
                    bossElement.innerHTML = `
                    <div class="creature-container">
                        <img class="creature" src="${boss.img}" alt="${boss.name}">
                        <div>${boss.name}</div>
                    </div>
                `;
                    table.appendChild(bossElement);
                });
            })
            .catch(error => console.error('Error loading bosses:', error));
    });
});