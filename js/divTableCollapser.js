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