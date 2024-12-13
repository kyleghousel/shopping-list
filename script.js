// DOM selectors
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clrBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Functions
function addItem(e) {
    e.preventDefault();

    newItem = itemInput.value;
    // Validate Input
    if (newItem == '') {
        alert('Please add an item')
        return;
    } 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function clearAll() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clrBtn.style.display = 'none';
        itemFilter.style.display = 'none';
        itemFilter.value = '';
    } else {
        clrBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clrBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);

checkUI();