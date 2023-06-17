function toggleDropdown(element) {

    var parent_elem = element.parentElement

    if (parent_elem.id === 'sort-div' || parent_elem.id === 'sort-content') {

        var dropdownContent = document.querySelector('#sort-content');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

    } else if (parent_elem.id === 'filter-div' || parent_elem.id === 'filter-content') {
        var dropdownContent = document.querySelector('#filter-content');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

    }
    if (parent_elem.className === 'dropdown-content') {
        var dropdownButton = parent_elem.parentElement.querySelector('.dropdown-toggle');
        dropdownButton.innerHTML = element.innerHTML + " ▼"
    }


}
