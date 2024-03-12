document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/creatures.json')
        .then(response => response.json())
        .then(data => {
            const creaturesFlex = document.getElementById('creaturesFlex');
            data.creatures.forEach(creature => {
                const creatureElement = document.createElement('div');
                creatureElement.innerHTML = `
                <div class="creature">
                    <img src="${creature.img}" alt="${creature.name}">
                    <div>${creature.name}</div>
                </div>
            `;
                creaturesFlex.appendChild(creatureElement);
            });
        })
        .catch(error => console.error('Error loading creatures:', error));
});