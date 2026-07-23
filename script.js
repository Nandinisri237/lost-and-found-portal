// Fetch items from database and show on page
async function loadItems() {
    const response = await fetch('/items');
    const items = await response.json();
    
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    
    items.forEach(function(item) {
        grid.innerHTML += `
            <div class="card" data-category="wallet" onclick="window.location.href='item.html?id=${item._id}'">
                <img src="uploads/${item.image}" alt="${item.itemName}">
                <h3>${item.itemName}</h3>
                <p>${new Date(item.date).toDateString()}</p>
                <p>${item.location}</p>
                <p>${item.phone}</p>
                <button onclick="window.location.href='tel:${item.phone}'">Contact Finder</button>
            </div>
        `;
    });
}

loadItems();
document.querySelector("header button").addEventListener("click", function() {
    window.location.href = "report.html";
});
function searchItems() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    
    cards.forEach(function(card) {
        let text = card.innerText.toLowerCase();
        if (text.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
function filterItems(category) {
    document.getElementById("searchInput").value = "";
    let cards = document.querySelectorAll(".card");
    
    cards.forEach(function(card) {
        if (category === "all") {
            card.style.display = "block";
        } else if (card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchItems();
    }
});

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(29,78,216,0.2);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            top: ${e.offsetY - 40}px;
            left: ${e.offsetX - 40}px;
            animation: ripple 0.5s linear;
            pointer-events: none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});