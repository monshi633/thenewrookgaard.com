document.addEventListener('DOMContentLoaded', function () {
    const numberOnline = document.getElementById('numberOnline');

    function fetchNumberOnline() {
        fetch('dbQueries.php?queryId=nOnline')
            .then(response => response.json())
            .then(data => {
                const count = data[0].players_online;
                numberOnline.innerText = count + (count === 1 ? ' Player Online' : ' Players Online');
            })
            .catch(error => console.error('Error loading numbers online:', error));
    }

    // Call the function immediately
    fetchNumberOnline();

    // Call again every 5 seconds
    setInterval(fetchNumberOnline, 5000);
});