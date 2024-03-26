document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById('label__section__library__bosses');

    label.addEventListener('click', function () {
        const table = document.getElementById('bossesFlex');
        table.innerText = '';
        fetch('/data/bosses.json')
            .then(response => response.json())
            .then(data => {
                data.bosses.forEach(boss => {
                    const bossElement = document.createElement('div');
                    bossElement.innerHTML = `
                    <div class="creature">
                        <div class="creature_container">
                            <img src="${boss.img}" alt="${boss.name}">
                        </div>
                            <div>${boss.name}</div>
                    </div>
                `;
                    table.appendChild(bossElement);
                });
            })
            .catch(error => console.error('Error loading bosses:', error));
    });
});