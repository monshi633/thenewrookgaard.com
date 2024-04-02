var isLoggedIn = false;

function chooseSection() {
    if (isLoggedIn) {
        showSection('sectionLoggedIn');
    } else {
        showSection('sectionLogin');
    }
}

function login() {
    // Forbidden accounts
    const forbiddenAccounts = ["1","god"];
    // Get credentials
    account = sanitizeCredentials(document.getElementById('loginAccount').value);
    password = sanitizeCredentials(document.getElementById('loginPassword').value);

    if (forbiddenAccounts.find((element) => element === account) || account.length < 1 || password.length < 1) {
        document.getElementById('errorMsg').style.display = 'block';
    } else {
        // Try to login
        // Fetch account status
        fetch(`dbQueries.php?queryId=getStatus&inputValue=${account}&inputValueTwo=${hashInput(password)}`)
            .then(response => response.json())
            .then(data => {
                const id = data[0].id;
                const days = data[0].premdays;
                const expirationDate = calculateDateFromToday(days);
                const gem = document.getElementById('statusbox-gem');
                const status = document.getElementById('statusbox-status');
                if (days > 0) {
                    gem.innerHTML = `
                        <img src="images/account-status_green.gif" alt="Premium account">
                    `;
                    status.innerHTML = `
                        <p style="color: green"><b>Premium account</b></p>
                        <span>Your Premium Time expires at ${expirationDate}.<br>(Balance of Premium Time: ${days} days)</span>
                    `;
                } else {
                    gem.innerHTML = `
                        <img src="images/account-status_red.gif" alt="Free account">
                    `;
                    status.innerHTML = `
                        <p style="color: red"><b>Free account</b></p>
                        <span>Your Premium Time has expired.<br>(Balance of Premium Time: 0 days)</span>
                    `;
                }

                // Fetch account characters
                getCharacters('accountCharactersTable',id);
            })
            .catch(error => console.error('Error loading account status:', error));
        
        document.getElementById('errorMsg').style.display = 'none';
        isLoggedIn = true;
        showSection('sectionLoggedIn');
    }

    // Clean fields
    document.getElementById('loginAccount').value = '';
    document.getElementById('loginPassword').value = '';
}

function logout() {
    isLoggedIn = false;
    showSection('sectionLogin');
}

function calculateDateFromToday(days) {
    var currentDate = new Date(); // Get today's date
    var futureDate = new Date(); // Initialize future date with today's date
    futureDate.setDate(currentDate.getDate() + days); // Set future date to be 'days' days from today
    
    // Format the date to 'MMM DD YYYY'
    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    return futureDate.toLocaleDateString('en-US', options);
}

function sanitizeCredentials(input) {
    return input; //TODO
}

function hashInput(inputData) {
    // Define URL of the PHP script
    const url = 'hash.php';

    // Define data to be sent in the POST request
    const data = new URLSearchParams();
    data.append('data', inputData);

    // Make a POST request to the PHP script
    return fetch(url, {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => data.hashedData)
    .catch(error => {
        console.error('Error:', error);
    });
}