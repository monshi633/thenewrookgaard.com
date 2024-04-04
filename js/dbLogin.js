var isLoggedIn = false;

function chooseSection() {
    if (isLoggedIn) {
        showSection('sectionLoggedIn');
    } else {
        showSection('sectionLogin');
        // Focus input
        document.getElementById("loginAccount").focus();
    }
}

function calculateDateFromToday(days) {
    var currentDate = new Date();
    var futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + days);
    
    // Format the date to 'MMM DD YYYY'
    var options = {year: 'numeric', month: 'short', day: '2-digit'};
    return futureDate.toLocaleDateString('en-US', options);
}

function login() {
    const forbiddenAccounts = ["1","god"];
    // Get input
    const account = document.getElementById('loginAccount').value;
    const password = document.getElementById('loginPassword').value;

    if (!forbiddenAccounts.find((element) => element === account) && account.length > 0 && password.length > 0) {
        // Get account status
        fetch(`dbQueries.php?queryId=getAccountStatus&inputValue=${account}&inputSecondValue=${password}`)
        .then(response => response.json())
        .then (data => {
            if (data && data.length > 0) {
                const id = data[0].id;
                const days = data[0].premdays;
                const expirationDate = calculateDateFromToday(days);
                
                const gem = document.getElementById('inputbox-gem');
                const status = document.getElementById('inputbox-status');
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
                
                document.getElementById('loginErrorMsg').style.display = 'none';
                isLoggedIn = true;
                showSection('sectionLoggedIn');
            } else {
                document.getElementById('loginErrorMsg').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
    }
    // Clean fields
    document.getElementById('loginAccount').value = '';
    document.getElementById('loginPassword').value = '';
}

function changePassword() {
    // Get input
    const account = document.getElementById('changeAccount').value;
    const oldPassword = document.getElementById('changeOldPassword').value;
    const newPassword = document.getElementById('changeNewPassword').value;
    const newPasswordRepeat = document.getElementById('changeNewPasswordRepeat').value;

    if (account.length > 0 && oldPassword.length > 0 && oldPassword != newPassword && newPassword.length > 0 && newPassword === newPasswordRepeat) {
        fetch(`dbQueries.php?queryId=setNewPassword&inputValue=${account}&inputSecondValue=${oldPassword}&inputThirdValue=${newPassword}`)
        .then(response => response.json())
        .then(data => {
            console.log(typeof(data),data);
            // Display confirmation
            showSection('sectionLogin');
            document.getElementById('successMsg').style.display = 'block';
            // Focus input
            document.getElementById('loginAccount').focus();
        })
        .catch(error => {
            console.error('Error changing password:', error);
            document.getElementById('changeErrorMsg').style.display = 'block';
        });
    }
}

// function recoverPassword() {
//     // Get input
//     const account = document.getElementById('lostAccount').value;
//     const recoveryKey = document.getElementById('lostKey').value;
//     const newPassword = document.getElementById('lostNewPassword').value;
//     const newPasswordRepeat = document.getElementById('lostNewPasswordRepeat').value;
// }

function logout() {
    isLoggedIn = false;
    showSection('sectionLogin');
    // Focus input
    document.getElementById('loginAccount').focus();
}