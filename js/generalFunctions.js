function collapseSubMenu(subMenuId,alwaysBlock) {
    const navSubmenu = document.getElementById(subMenuId)
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

function showSection(section) {
    // Hide all sections
    const otherSections = document.getElementsByTagName('section')
    for (let i = 0; i < otherSections.length; i++) {
        otherSections[i].style.display = 'None';
    }
    // Hide all activeicons
    const activeicons = document.getElementsByClassName('nav__menu__activeicon')
    for (let i = 0; i < activeicons.length; i++) {
        activeicons[i].style.visibility = 'hidden';
    }
    // Reset all colors
    const activelabels = document.getElementsByClassName('nav__menu__submenu')
    for (let i = 0; i < activelabels.length; i++) {
        activelabels[i].style.color = '#d7d7d7';
    }
    // Show clicked section
    const sectionElement = document.getElementById(section)
    sectionElement.style.display = 'Block';
    if (section != 'section__login') {
        // Show active icon
        const activeiconId = document.getElementById('activeicon' + section)
        if (activeiconId) {
            activeiconId.style.visibility = 'visible';
        }
        // Highlight submenu
        const labelId = document.getElementById('submenu' + section)
        if (labelId) {
            labelId.style.color = 'white';
        }
    }
}

function collapseTable(divId,isRow) {
    const divTable = document.getElementById(divId)
    if (divTable.style.display != 'none') {
        divTable.style.display = 'none';
    } else {
        if (isRow) {
            divTable.style.display = 'table-row';
        } else {
            divTable.style.display = 'block';
        }
    }
}

function handleKeyPress(event, elementId) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Trigger the click event of the submit button
        document.getElementById(elementId).click();
    }
}

function focusElement(elementId) {
    document.getElementById(elementId).focus();
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = 'none';
}