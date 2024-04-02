var isLoggedIn = false;

function chooseSection() {
    if (isLoggedIn) {
        showSection('sectionLoggedIn');
    } else {
        showSection('sectionLogin');
    }
}

function login() {
    // Get credentials
    account = sanitizeInput(document.getElementById('loginAccount').value);
    password = sanitizeInput(document.getElementById('loginPassword').value);

    console.log(account,password);
    // Try to login
    if (account.length > 0 && password.length > 0) {
        // Fetch account status
        fetch(`dbQueries.php?queryId=getStatus&inputValue=${account}`)
            .then(response => response.json())
            .then(data => {
                const id = data[0].id;
                const days = data[0].premmdays;
                const expirationDate = calculateDateFromToday(days);
                const gem = document.getElementById('statusbox-gem');
                const status = document.getElementById('statusbox-status');
                if (days > 0) {
                    gem.innerHTML = `
                        <img src="images/account-status_green.gif" alt="Premium account">
                    `;
                    status.innerHTML = `
                        <p style="color: green"><b>Premium account</b></p>
                        <span>Your Premium Time expires at ${expirationDate}.<br>(Balance of Premium Time: ${days} days</span>
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
    } else {
        document.getElementById('errorMsg').style.display = 'block';
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