document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Vivo 66W Flash Charger",
            price: 99.99,
            image: "images/p1.jpg",
            description: "Vivo Original 66W FlashCharge Wall Charger (Model: V6660L0A1-EU).",
            details: "Model: V6660L0A1-EU <br> Manufacturer: AOHAI <br> Country of Origin: China <br> Brand: Vivo."
        },
        {
            id: 2,
            name: "4-Port Power Strip with Individual Switches",
            price: 199.99,
            image: "images/p3.jpg",
            description: "Multi-Functional Power Extension Board with 4 Universal Sockets & 4 Individual Power Switches.",
            details: "Total Sockets: 5 (Universal)<br> Switches: 5 individual red switches <br> Power Capacity: 250V, 10A (approx.) <br> Compatible with: Multi-pin & International plugs<br> Safety Feature: Separate on/off switches per socket <br> Color: White with Red switches <br> Country of Origin: China."
        },
        {
            id: 3,
            name: "Emami HE Body Perfume",
            price: 79.99,
            image: "images/p4.jpg",
            description: "Emami HE Passion Body Perfume.",
            details: "Brand:  Emami HE <br>Product Type: Body Perfume <br> Variant/Fragrance: Passion <br> Features: Advanced Grooming, Zero Gas, High Performance, Long Lasting Fragrance <br> Packaging: Red and black spray can with a metallic finish. <br> Origin Markings: MADE IN INDIA and GROOMING IN-HOUSE USA logos visible.."
        },
        {
            id: 4,
            name: "Zam Zam Attar",
            price: 49.99,
            image: "images/p5.jpg",
            description: "Zam Zam 8ml (likely concentrated perfume oil or attar).",
            details: "Volume: 8ml<br>Type: Roll-on bottle (indicated by the top and small size)<br>Content: Appears to be a clear, light-colored liquid (often Zam Zam water or an associated fragrance/attar). The context of Zam Zam typically refers to the holy water from Mecca, or fragrances inspired by it.<br>Packaging: Frosted glass bottle with white ribbed cap."
        },
        {
            id: 5,
            name: "Wireless Keyboard & Mouse",
            price: 59.99,
            image: "images/p2.jpg",
            description: "Slim wireless keyboard with quiet-touch keys and long battery life.",
            details: "Compatible with Windows, Mac, iOS and Android. 2.4GHz wireless connection with 10m range. Includes built-in rechargeable battery."
        },
        {
            id: 6,
            name: "USB Flash Drive",
            price: 129.99,
            image: "images/p6.jpg",
            description: "ADATA UV128 USB Flash Drive.",
           details: "Brand: ADATA.<br> Model: UV128<br>Storage Capacity: 64GB<br>Color: Black with blue slider mechanism<br>Type: USB 2.0 or 3.0 (not specified on visible label)<br>Feature: Retractable USB connector."

        }
    ];

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const modal = document.getElementById('product-modal');
    const modalDetails = document.getElementById('modal-product-details');
    const closeModal = document.querySelector('.close-modal');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.querySelector('.cart-count');
    const closeCart = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart-icon a');

    // Cart state
    let cart = [];

    // Display products
    function displayProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">৳${product.price.toFixed(2)}</span>
                    <div class="product-actions">
                        <button class="details-btn" data-id="${product.id}">Details</button>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Show product details in modal
    function showProductDetails(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            modalDetails.innerHTML = `
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-product-info">
                    <h3>${product.name}</h3>
                    <span class="modal-product-price">৳${product.price.toFixed(2)}</span>
                    <p class="modal-product-description">${product.details}</p>
                    <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            // Add event listener to the modal's add to cart button
            modalDetails.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
            
            modal.style.display = 'flex';
        }
    }

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
        }
    }

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotalPrice.textContent = '0.00';
            return;
        }
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">৳${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">Remove</div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            
            totalPrice += item.price * item.quantity;
        });
        
        // Update total price
        cartTotalPrice.textContent = totalPrice.toFixed(2);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Increase item quantity
    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    }

    // Decrease item quantity
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Remove item if quantity becomes 0
                cart = cart.filter(item => item.id !== productId);
            }
            updateCart();
        }
    }

    // Remove item from cart
    function removeItem(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Event listeners
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.style.right = '0';
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.style.right = '-400px';
    });

    // Initialize the page
    displayProducts();
    updateCart();
});