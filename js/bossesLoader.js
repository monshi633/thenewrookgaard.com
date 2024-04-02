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
                    bossElement.classList.add("creature-container")
                    bossElement.innerHTML = `
                    <div class="creature">
                        <img src="${boss.img}" alt="${boss.name}">
                    </div>
                    <div>${boss.name}</div>
                `;
                    table.appendChild(bossElement);
                });
            })
            .catch(error => console.error('Error loading bosses:', error));
    });
});