function menuButtonAction(navMenuId,alwaysBlock) {
    const navSubmenu = document.getElementById(navMenuId + '__submenu')
    if (navSubmenu.style.display != 'block') {
        navSubmenu.style.display = 'block';
    } else {
        if (alwaysBlock) {
            return    
        } else {
            navSubmenu.style.display = 'none';
        }
    }
}

function openContent(section) {
    // Hide all sections
    const otherSections = document.getElementsByTagName('section')
    for (let i = 0; i < otherSections.length; i++) {
        otherSections[i].style.display = 'None';
    }
    // Hide all activeicons
    const activeicons = document.getElementsByClassName('submenu__activeicon')
    for (let i = 0; i < activeicons.length; i++) {
        activeicons[i].style.visibility = 'hidden';
    }
    // Reset all colors
    const activelabels = document.getElementsByClassName('submenu_label')
    for (let i = 0; i < activelabels.length; i++) {
        activelabels[i].style.color = '#d7d7d7';
    }
    // Show clicked section
    const sectionElement = document.getElementById(section)
    sectionElement.style.display = 'Block';
    if (section != 'section__login') {
        // Show active icon
        const activeiconId = document.getElementById('activeicon__' + section)
        activeiconId.style.visibility = 'visible';
        // Highlight label
        const labelId = document.getElementById('label__' + section)
        labelId.style.color = 'white';
    }
}

function resetCharacters() {
    document.getElementById('characterNotFoundMessage').innerHTML = '';
    document.getElementById('characterNotFound').style.display = 'none';
    document.getElementById('characterInfo').style.display = 'none';
    document.getElementById('characters').style.display = 'none';
}