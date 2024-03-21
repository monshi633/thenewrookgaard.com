document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById('label__section__library__creatures');

    label.addEventListener('click', function () {
        const table = document.getElementById('creaturesFlex');
        table.innerText = '';
        fetch('/data/creatures.json')
            .then(response => response.json())
            .then(data => {
                data.creatures.forEach(creature => {
                    const creatureElement = document.createElement('div');
                    creatureElement.innerHTML = `
                    <div class="creature">
                        <div class="creature_container">
                            <img src="${creature.img}" alt="${creature.name}">
                        </div>
                            <div>${creature.name}</div>
                    </div>
                `;
                    table.appendChild(creatureElement);
                });
            })
            .catch(error => console.error('Error loading creatures:', error));
    });
});