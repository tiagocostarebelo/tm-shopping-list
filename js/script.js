// ADD ITEM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterInput = document.getElementById('filter');
const clearAllBtn = document.getElementById('clear');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '' || /^\d+$/.test(newItem)) {
        alert('Please input a valid item');
        itemInput.value = '';
        return;
    }

    const formattedItem = newItem.toLowerCase().charAt(0).toUpperCase() + newItem.toLowerCase().slice(1);
    console.log(formattedItem)
    //Create item DOM element
    addItemToDOM(formattedItem);

    //Add item to LocalStorage
    addItemToStorage(formattedItem);


    itemInput.value = '';
    checkUI();
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Adding new item to the array
    itemsFromStorage.push(item);

    // Converting to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    // Checking for existing items in Local Storage and store them as an array in the above variable
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        //remove from DOM
        item.remove();

        //remove from Storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter item to remove
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAllItems(e) {
    if (confirm('Are you sure?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }

    localStorage.removeItem('items');
    checkUI();
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    const itemFilter = document.querySelector('.filter');
    if (items.length === 0) {
        clearAllBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearAllBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const searchText = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(searchText) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//Initialize App
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    filterInput.addEventListener('input', filterItems);
    clearAllBtn.addEventListener('click', clearAllItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();



