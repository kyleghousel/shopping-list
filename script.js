// DOM selectors
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clrBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions

function displayItems() {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach((item) => addItemToDOM(item));

    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    newItem = itemInput.value;
    // Validate Input
    if (newItem == '') {
        alert('Please add an item')
        return;
    } 

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }

    addItemToDOM(newItem);

    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    // Check if item already exists
    if (checkItems(item)) {
        console.log('Duplicate item! Not adding.');
        return; // Exit the function if it's a duplicate
    }

    // Create new <li> element
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    // Add the remove button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add <li> to the DOM
    itemList.appendChild(li);

    console.log('Item added to the list.');
}

function checkItems(newItemText) {
    const items = document.querySelectorAll('li');
    return Array.from(items).some(item => item.firstChild.textContent === newItemText);
}


function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
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
    icon.className = classes
    return icon;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;

}

function removeItem(item) {
   if (confirm('Are you sure?')) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
   }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAll() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //Clear from local storage
    localStorage.removeItem('items');

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
    
}

function checkUI() {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clrBtn.style.display = 'none';
        itemFilter.style.display = 'none';
        itemFilter.value = '';
    } else {
        clrBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'

    isEditMode = false;
}

//Initialize 
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clrBtn.addEventListener('click', clearAll);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();
