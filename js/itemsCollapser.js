function collapseTable(itemTableId) {
    const itemTable = document.getElementById(itemTableId)
    if (itemTable.style.display != 'none') {
        itemTable.style.display = 'none';
    } else {
        itemTable.style.display = 'block';
    }
}
