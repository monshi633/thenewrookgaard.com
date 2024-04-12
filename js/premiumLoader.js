var sectionBack = '';

function setDeactivationContainer(sectionBehind = '') {
    const deactivationContainer = document.getElementById('deactivationContainer');
    const iframe = document.getElementById('BTCPay');

    if (deactivationContainer.style.display == 'none') {
        iframe.src = iframe.src; // Reload every time
        deactivationContainer.style.display = 'block';
        showSection('sectionLoginBuyPremium');
        sectionBack = sectionBehind;
    } else {
        deactivationContainer.style.display = 'none';
        showSection(sectionBack);
    }
}