// Product Data
const products = [
    // Chicken Products
    {
        id: 1,
        name: "Whole Chicken",
        description: "1.4 - 1.5 kg",
        price: 650,
        category: "chicken",
        image: "https://static.photos/food/640x360/1"
    },
    {
        id: 2,
        name: "Whole Chicken",
        description: "1.2 - 1.3 kg",
        price: 550,
        category: "chicken",
        image: "https://static.photos/food/640x360/2"
    },
    {
        id: 3,
        name: "Grillers",
        description: "Perfect for BBQ",
        price: 450,
        category: "chicken",
        image: "https://static.photos/food/640x360/3"
    },
    {
        id: 4,
        name: "Spring Chicken",
        description: "Young and tender",
        price: 420,
        category: "chicken",
        image: "https://static.photos/food/640x360/4"
    },
    {
        id: 5,
        name: "Whole Legs",
        description: "1 kg pack",
        price: 450,
        category: "chicken",
        image: "https://static.photos/food/640x360/5"
    },
    {
        id: 6,
        name: "Chicken Wings",
        description: "1 kg pack",
        price: 600,
        category: "chicken",
        image: "https://static.photos/food/640x360/6"
    },
    {
        id: 7,
        name: "Boneless Fillet",
        description: "1 kg premium cuts",
        price: 700,
        category: "chicken",
        image: "https://static.photos/food/640x360/7"
    },
    {
        id: 8,
        name: "Drumsticks",
        description: "1 kg pack",
        price: 600,
        category: "chicken",
        image: "https://static.photos/food/640x360/8"
    },
    // Meat & Sausages
    {
        id: 9,
        name: "Catering Sausage",
        description: "1 kg bulk pack",
        price: 670,
        category: "meat",
        image: "https://static.photos/food/640x360/9"
    },
    {
        id: 10,
        name: "Beef Sausages",
        description: "1 kg premium beef",
        price: 700,
        category: "meat",
        image: "https://static.photos/food/640x360/10"
    },
    {
        id: 11,
        name: "Pork Sausages",
        description: "1 kg premium pork",
        price: 700,
        category: "meat",
        image: "https://static.photos/food/640x360/11"
    },
    {
        id: 12,
        name: "Smokies",
        description: "1 kg pack",
        price: 465,
        category: "meat",
        image: "https://static.photos/food/640x360/12"
    },
    {
        id: 13,
        name: "Safari Beef",
        description: "500 g smoked beef",
        price: 380,
        category: "meat",
        image: "https://static.photos/food/640x360/13"
    },
    {
        id: 14,
        name: "Classic Safari Pork",
        description: "500 g smoked pork",
        price: 380,
        category: "meat",
        image: "https://static.photos/food/640x360/14"
    },
    {
        id: 15,
        name: "Collar Bacon",
        description: "100 g pack",
        price: 200,
        category: "meat",
        image: "https://static.photos/food/640x360/15"
    },
    {
        id: 16,
        name: "Collar Bacon",
        description: "400 g pack",
        price: 550,
        category: "meat",
        image: "https://static.photos/food/640x360/16"
    },
    {
        id: 17,
        name: "Diced Bacon",
        description: "500 g pack",
        price: 650,
        category: "meat",
        image: "https://static.photos/food/640x360/17"
    },
    {
        id: 18,
        name: "Meat on Bone",
        description: "1 kg beef",
        price: 700,
        category: "meat",
        image: "https://static.photos/food/640x360/18"
    },
    {
        id: 19,
        name: "Pork Ribs",
        description: "1 kg premium ribs",
        price: 1000,
        category: "meat",
        image: "https://static.photos/food/640x360/19"
    },
    // Premium
    {
        id: 20,
        name: "Fish Fillet",
        description: "Fresh fish fillets",
        price: 1100,
        category: "premium",
        image: "https://static.photos/food/640x360/20"
    },
    {
        id: 21,
        name: "Picanha",
        description: "Premium beef cut",
        price: 1900,
        category: "premium",
        image: "https://static.photos/food/640x360/21"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('kuku_cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCartUI();
});

// Render Products
function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card fade-in bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div class="relative h-48 overflow-hidden bg-gray-100">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                <div class="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    KSh ${product.price}
                </div>
            </div>
            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <div>
                       <h3 class="text-lg font-semibold text-gray-900">${product.name}</h3>

                      <p class="text-green-600 text-xs font-medium mt-1">
                       Fresh • Quality Checked
                       </p>
                        <p class="text-sm text-gray-500">${product.description}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-2xl font-bold text-red-600">KSh ${product.price}</span>
                    <button onclick="handleAddToCart(this, ${product.id})" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium">
                        <i data-lucide="plus" class="h-4 w-4"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for new content
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Filter Products
function filterProducts(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.classList.add('bg-red-600', 'text-white');
        } else {
            btn.classList.remove('bg-red-600', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700');
        }
    });

    const grid = document.getElementById('products-grid');

    // Loading state
    grid.innerHTML = '<p class="col-span-full text-center text-gray-500">Loading products...</p>';

    setTimeout(() => {
        renderProducts(category);
    }, 300);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update badges
    const badges = [document.getElementById('cart-count'), document.getElementById('cart-count-mobile')];
    badges.forEach(badge => {
        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    });
    
    // Update cart items
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-gray-500 mt-8 fade-in">
                <i data-lucide="shopping-bag" class="h-12 w-12 mx-auto mb-3 text-gray-300"></i>
                <p>Your cart is empty</p>
                <button onclick="toggleCart(); window.location.href='#products'" class="mt-4 text-red-600 font-medium hover:underline">Start Shopping</button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex gap-4 bg-gray-50 p-4 rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">${item.name}</h4>
                    <p class="text-sm text-gray-500 mb-2">${item.description}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                            <button onclick="updateQuantity(${item.id}, -1)" class="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold">-</button>
                            <span class="px-2 font-medium text-sm">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" class="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold">+</button>
                        </div>
                        <span class="font-bold text-red-600">KSh ${item.price * item.quantity}</span>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-600 self-start">
                    <i data-lucide="trash-2" class="h-5 w-5"></i>
                </button>
            </div>
        `).join('');
    }
    
    cartTotal.textContent = `KSh ${total.toLocaleString()}`;
    
    // Re-initialize icons
    if (window.lucide) {
        lucide.createIcons();
    }
localStorage.setItem('kuku_cart', JSON.stringify(cart));
}

// Toggle Cart
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        sidebar.classList.add('open');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}
function handleAddToCart(button, productId) {
    addToCart(productId);

    // Visual feedback
    button.innerHTML = "Added ✓";
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = `
            <i data-lucide="plus" class="h-4 w-4"></i>
            Add
        `;
        button.disabled = false;

        if (window.lucide) lucide.createIcons();
    }, 1000);
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Checkout via WhatsApp
// Checkout via WhatsApp + MongoDB
async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    const total = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Create order for MongoDB
    const order = {
        items: cart.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: item.quantity
        })),
        total: total,
        status: "Pending",
        date: new Date().toLocaleString()
    };

    // Create WhatsApp message
    let message = 'Hello Kuku Cut! I would like to order:\n\n';

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        message += `• ${item.name} (${item.description}) x${item.quantity} - KSh ${subtotal}\n`;
    });

    message += `\nTotal: KSh ${total.toLocaleString()}`;
    message += `\n\nPlease confirm availability. Thank you!`;

    try {
        // Save order to MongoDB
        const response = await fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to save order');
        }

        // WhatsApp phone number
        const phoneNumber = '254700000000';

        // Encode WhatsApp message
        const encodedMessage = encodeURIComponent(message);

        // Create WhatsApp URL
        const whatsappUrl =
            `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear cart after successful order
        cart = [];
        updateCartUI();

        // Close cart sidebar
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');

        if (sidebar) {
            sidebar.classList.remove('open');
        }

        if (overlay) {
            overlay.classList.add('hidden');
        }

        document.body.style.overflow = '';

        showNotification('Order saved! Opening WhatsApp...');

    } catch (error) {
        console.error('Order submission error:', error);

        alert(
            'Unable to place your order. Please make sure the server is running.'
        );
    }
}
function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        updateCartUI();
    }
}

// Handle messages
async function handleMessage(event) {
    event.preventDefault();

    console.log("CONTACT FORM SUBMITTED");

    const form = event.target;

    const messageData = {
        firstName: form[0].value.trim(),
        lastName: form[1].value.trim(),
        email: form[2].value.trim(),
        phone: form[3].value.trim(),
        message: form[4].value.trim()
    };

    console.log("Message data:", messageData);

    try {

        console.log("Sending message to server...");

        const response = await fetch('http://localhost:3000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        console.log("Server response status:", response.status);

        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to save message');
        }

        alert("Message sent successfully!");

        form.reset();

    } catch (error) {

        console.error("MESSAGE ERROR:", error);

        alert("Failed to send message: " + error.message);
    }
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
   notification.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 fade-in';
    notification.innerHTML = `
        <i data-lucide="check-circle" class="h-5 w-5 text-green-400"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    if (window.lucide) {
        lucide.createIcons();
    }
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.getElementById('mobile-menu').classList.add('hidden');
            }
        });
    });
});