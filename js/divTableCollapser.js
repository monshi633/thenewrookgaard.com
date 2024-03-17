function collapseTable(divId) {
    const divTable = document.getElementById(divId)
    if (divTable.style.display != 'none') {
        divTable.style.display = 'none';
    } else {
        divTable.style.display = 'block';
    }
}
