async function loadItem() {
    const id = new URLSearchParams(window.location.search).get('id');
    const response = await fetch('/items/' + id);
    const item = await response.json();
    
    document.getElementById('itemImage').src = item.image ? 'uploads/' + item.image : 'https://placehold.co/300x200';
    document.getElementById('itemName').innerText = item.itemName;
    document.getElementById('itemLocation').innerText = '📍 ' + item.location;
    document.getElementById('itemDate').innerText = '📅 ' + new Date(item.date).toDateString();
    document.getElementById('itemFinder').innerText = '👤 ' + item.finderName;
    document.getElementById('itemPhone').innerText = '📞 ' + item.phone;
    
    document.querySelector('.item-container button').onclick = function() {
        alert('Contact Finder: ' + item.phone);
    };
}

loadItem();