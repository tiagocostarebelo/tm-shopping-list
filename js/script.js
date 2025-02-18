// ADD ITEM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');

function addItem(e) {
    e.preventDefault();

    if (itemInput.value === '' || /^\d+$/.test(itemInput.value)) {
        alert('Please input a valid item');
        itemInput.value = '';
        return;
    }
    const formattedInput = itemInput.value.toLowerCase().charAt(0).toUpperCase() + itemInput.value.toLowerCase().slice(1);
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(formattedInput));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearAllItems(e) {
    if (confirm('Are you sure?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
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

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAllBtn.addEventListener('click', clearAllItems);


