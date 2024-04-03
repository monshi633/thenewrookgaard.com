var isLoggedIn = false;

function chooseSection() {
    if (isLoggedIn) {
        showSection('sectionLoggedIn');
    } else {
        showSection('sectionLogin');
    }
}

async function login() {
    // Forbidden accounts
    const forbiddenAccounts = ["1","god"];
    // Get credentials
    account = sanitizeCredentials(document.getElementById('loginAccount').value);
    password = sanitizeCredentials(document.getElementById('loginPassword').value);

    if (forbiddenAccounts.find((element) => element === account) || account.length < 1 || password.length < 1) {
        document.getElementById('errorMsg').style.display = 'block';
    } else {
        // Try to login
        try {
            const hashedData = await hashInput(account,password);

            if (!hashedData) {
                throw new Error('Hashed data is not available');
            }

            const response = await fetch(`dbQueries.php?queryId=getStatus&inputValue=${account}&inputSecondValue=${hashInput(account,password)}`);

            if (!response) {
                throw new Error('Failed to fetch data from dbQueries.php');
            }

            const responseData = await response.json();

            // Display data
            const id = responseData[0].id;
            const days = responseData[0].premdays;
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

            document.getElementById('errorMsg').style.display = 'none';
            isLoggedIn = true;
            showSection('sectionLoggedIn');
        } catch (error) {
            console.error('Error:', error.message);
        }
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

async function hashInput(account,password) {
    // Define URL of the PHP script
    const url = 'hash.php';

    // Define data to be sent in the POST request
    const data = new URLSearchParams();
    data.append('account', account);
    data.append('password', password);

    // Make a POST request to the PHP script
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        return responseData.hashedData;
    } catch (error) {
        console.error('Error:',error.message);
        return null;
    }
}