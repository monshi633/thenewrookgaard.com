var isLoggedIn = false;

function chooseSection() {
    if (isLoggedIn) {
        showSection('sectionLoggedIn');
    } else {
        showSection('sectionLogin');
        focusElement('loginAccount');
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

function login(event) {
    // Prevent default form submission
    event.preventDefault();

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
                const email = data[0].email;
                const expirationDate = calculateDateFromToday(days);
                
                const gem = document.getElementById('accountGem');
                const status = document.getElementById('accountStatus');

                // Show account status
                if (days > 0) {
                    gem.innerHTML = `
                    <img src="images/account-status_green.gif" alt="Premium account">
                    `;
                    status.innerHTML = `
                    <p style="color: green"><b>Premium account</b></p>
                    <span>Your Premium Time expires at ${expirationDate}.<br>(Balance of Premium Time: ${days} days)</span>
                    <br><br>
                    `;
                } else {
                    gem.innerHTML = `
                    <img src="images/account-status_red.gif" alt="Free account">
                    `;
                    status.innerHTML = `
                    <p style="color: red"><b>Free account</b></p>
                    <span>Your Premium Time has expired.<br>(Balance of Premium Time: 0 days)</span>
                    <br><br>
                    `;
                }

                // Show email
                if (email != null && email != '') {
                    const emailSpan = document.createElement('span');
                    emailSpan.textContent = `Your email is: ${email}.`;
                    status.appendChild(emailSpan);
                } else {
                    const emailSpan = document.createElement('span');
                    emailSpan.innerHTML = `<b>Your haven't set an email yet.</b>`;
                    status.appendChild(emailSpan);
                }
                
                // Fetch account characters
                getCharacters('accountCharactersTable',id);
                
                // Display section
                isLoggedIn = true;
                showSection('sectionLoggedIn');
            } else {
                document.getElementById('loginErrorMsg').style.display = 'block';
                setTimeout(hideElement, 5000,'loginErrorMsg');
                focusElement('loginAccount');
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

function recoverPassword(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get input
    const account = document.getElementById('lostAccount').value;
    const recoveryKey = document.getElementById('lostKey').value;
    const newPassword = document.getElementById('lostNewPassword').value;
    const newPasswordRepeat = document.getElementById('lostNewPasswordRepeat').value;

    if (account.length > 0 && recoveryKey.length > 0 && newPassword.length > 0 && newPassword === newPasswordRepeat) {
        fetch(`dbQueries.php?queryId=setNewPassword&inputValue=${account}&inputSecondValue=${recoveryKey}&inputThirdValue=${newPassword}&inputFourthValue='key'`)
        .then(response => response.json())
        .then(data => {
            // Display confirmation
            isLoggedIn = false;
            showSection('sectionLogin');
            document.getElementById('successMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'successMsg');
            focusElement('loginAccount');
        })
        .catch(error => {
            document.getElementById('lostErrorMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'lostErrorMsg');
            focusElement('lostAccount');
        });
    }
    
    // Clear inputs
    document.getElementById('lostAccount').value = '';
    document.getElementById('lostKey').value = '';
    document.getElementById('lostNewPassword').value = '';
    document.getElementById('lostNewPasswordRepeat').value = '';
}

function setEmail(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get input
    const email = document.getElementById('email').value;
    const account = document.getElementById('emailAccount').value;
    const password = document.getElementById('emailPassword').value;

    if (isLoggedIn && account.length > 0 && password.length > 0) { // TODO: Add check for valid email format
        fetch(`dbQueries.php?queryId=setEmail&inputValue=${account}&inputSecondValue=${password}&inputThirdValue=${email}`)
        .then(response => response.json())
        .then(data => {
            // Check for reward
            if (data[0].reward) {
                document.getElementById('reward').style.display = "block";
                setTimeout(hideElement, 5000,'reward');
            }

            // Display confirmation
            isLoggedIn = false;
            showSection('sectionLogin');
            document.getElementById('emailSuccessMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'emailSuccessMsg');
            focusElement('loginAccount');
        })
        .catch(error => {
            document.getElementById('emailErrorMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'emailErrorMsg');
            focusElement('email');
        });
    }
    
    // Clear inputs
    document.getElementById('email').value = '';
    document.getElementById('emailAccount').value = '';
    document.getElementById('emailPassword').value = '';
}

function changePassword(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get input
    const account = document.getElementById('changeAccount').value;
    const oldPassword = document.getElementById('changeOldPassword').value;
    const newPassword = document.getElementById('changeNewPassword').value;
    const newPasswordRepeat = document.getElementById('changeNewPasswordRepeat').value;

    if (isLoggedIn && account.length > 0 && oldPassword.length > 0 && oldPassword != newPassword && newPassword.length > 0 && newPassword === newPasswordRepeat) {
        fetch(`dbQueries.php?queryId=setNewPassword&inputValue=${account}&inputSecondValue=${oldPassword}&inputThirdValue=${newPassword}`)
        .then(response => response.json())
        .then(data => {
            // Display confirmation
            isLoggedIn = false;
            showSection('sectionLogin');
            document.getElementById('successMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'successMsg');
            focusElement('loginAccount');
        })
        .catch(error => {
            document.getElementById('changeErrorMsg').style.display = 'block';
            setTimeout(hideElement, 5000,'changeErrorMsg');
            focusElement('changeAccount');
        });
    }
    
    // Clear inputs
    document.getElementById('changeAccount').value = '';
    document.getElementById('changeOldPassword').value = '';
    document.getElementById('changeNewPassword').value = '';
    document.getElementById('changeNewPasswordRepeat').value = '';
}

function logout() {
    isLoggedIn = false;
    showSection('sectionLogin');
    focusElement('loginAccount');
}

var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',login);

var lostForm = document.getElementById('lostForm');
lostForm.addEventListener('submit',recoverPassword);

var changeForm = document.getElementById('changeForm');
changeForm.addEventListener('submit',changePassword);

var emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit',setEmail);