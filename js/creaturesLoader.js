document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.getElementById('submenuSectionLibraryCreatures');

    submenu.addEventListener('click', function () {
        const table = document.getElementById('creaturesFlex');
        table.innerText = '';
        fetch('/data/creatures.json')
            .then(response => response.json())
            .then(data => {
                data.creatures.forEach(creature => {
                    const creatureElement = document.createElement('div');
                    creatureElement.classList.add("creature-container")
                    creatureElement.innerHTML = `
                    <div class="creature">
                        <img src="${creature.img}" alt="${creature.name}">
                    </div>
                    <div>${creature.name}</div>
                `;
                    table.appendChild(creatureElement);
                });
            })
            .catch(error => console.error('Error loading creatures:', error));
    });
});