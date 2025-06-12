document.addEventListener('DOMContentLoaded', function() {

    // --- DATA ---
    const products = {
        1: {
            id: 1, name: "DBMS Complete Notes - CSE Semester 4", price: 79, originalPrice: 149, rating: "4.5 (124 reviews)",
            image: "https://readdy.ai/api/search-image?query=database%20management%20system%20textbook%20cover%2C%20educational%20material%2C%20professional%20design%20with%20database%20icons%20and%20diagrams&width=300&height=200&seq=8&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20database%20management%20system%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20diagrams%20and%20text%2C%20professional%20layout&width=300&height=400&seq=7&orientation=portrait"
        },
        2: {
            id: 2, name: "Data Structures & Algorithms - CSE Semester 3", price: 99, originalPrice: 199, rating: "5.0 (89 reviews)",
            image: "https://readdy.ai/api/search-image?query=data%20structures%20and%20algorithms%20textbook%20cover%2C%20educational%20material%2C%20professional%20design%20with%20algorithm%20flowcharts&width=300&height=200&seq=10&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20data%20structures%20and%20algorithms%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20code%20examples%20and%20diagrams%2C%20professional%20layout&width=300&height=400&seq=11&orientation=portrait"
        },
        3: {
            id: 3, name: "Thermodynamics Notes - Mechanical Semester 4", price: 69, originalPrice: 129, rating: "4.0 (76 reviews)",
            image: "https://readdy.ai/api/search-image?query=thermodynamics%20textbook%20cover%2C%20mechanical%20engineering%2C%20educational%20material%2C%20professional%20design%20with%20engine%20diagrams&width=300&height=200&seq=12&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20thermodynamics%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20formulas%20and%20diagrams%2C%20professional%20layout&width=300&height=400&seq=13&orientation=portrait"
        },
        4: {
            id: 4, name: "Circuit Analysis - Electrical Semester 3", price: 89, originalPrice: 179, rating: "4.5 (108 reviews)",
            image: "https://readdy.ai/api/search-image?query=circuit%20analysis%20textbook%20cover%2C%20electrical%20engineering%2C%20educational%20material%2C%20professional%20design%20with%20circuit%20diagrams&width=300&height=200&seq=14&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20circuit%20analysis%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20circuit%20diagrams%20and%20equations%2C%20professional%20layout&width=300&height=400&seq=15&orientation=portrait"
        },
        5: {
            id: 5, name: "Structural Analysis - Civil Semester 5", price: 79, originalPrice: 159, rating: "4.0 (64 reviews)",
            image: "https://readdy.ai/api/search-image?query=structural%20analysis%20textbook%20cover%2C%20civil%20engineering%2C%20educational%20material%2C%20professional%20design%20with%20building%20structure%20diagrams&width=300&height=200&seq=16&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20structural%20analysis%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20structural%20diagrams%20and%20calculations%2C%20professional%20layout&width=300&height=400&seq=17&orientation=portrait"
        },
        6: {
            id: 6, name: "Digital Electronics - ECE Semester 3", price: 69, originalPrice: 139, rating: "4.5 (92 reviews)",
            image: "https://readdy.ai/api/search-image?query=digital%20electronics%20textbook%20cover%2C%20electronics%20engineering%2C%20educational%20material%2C%20professional%20design%20with%20circuit%20board%20diagrams&width=300&height=200&seq=18&orientation=landscape",
            previewImage: "https://readdy.ai/api/search-image?query=preview%20of%20digital%20electronics%20notes%20with%20watermark%2C%20educational%20material%2C%20textbook%20page%20with%20logic%20gate%20diagrams%20and%20truth%20tables%2C%20professional%20layout&width=300&height=400&seq=19&orientation=portrait"
        }
    };

    const cart = {
        items: [],
        total: 0,
        addItem: function(id, name, price) {
            const existingItem = this.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ id, name, price, quantity: 1 });
            }
            this.updateTotal();
            this.updateCartUI();
        },
        removeItem: function(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.updateTotal();
            this.updateCartUI();
        },
        updateTotal: function() {
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        updateCartUI: function() {
            const cartCount = document.getElementById('cart-count');
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');

            cartCount.textContent = this.items.reduce((count, item) => count + item.quantity, 0);

            if (this.items.length === 0) {
                cartItems.innerHTML = '<div class="text-center text-gray-500 py-4">Your cart is empty</div>';
            } else {
                cartItems.innerHTML = this.items.map(item => `
                    <div class="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                            <p class="text-sm text-gray-800">${item.name}</p>
                            <p class="text-xs text-gray-500">₹${item.price} × ${item.quantity}</p>
                        </div>
                        <button class="remove-item text-gray-400 hover:text-red-500" data-id="${item.id}">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                `).join('');
                
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', () => {
                        this.removeItem(button.getAttribute('data-id'));
                    });
                });
            }
            cartTotal.textContent = `₹${this.total}`;
        }
    };

    // --- EVENT LISTENERS ---

    // Add items from main page (bundles) to cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            cart.addItem(id, name, price);
        });
    });

    // Open Checkout from cart dropdown
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.items.length > 0) {
            const checkoutItems = document.getElementById('checkout-items');
            let itemsHTML = '';
            cart.items.forEach(item => {
                itemsHTML += `
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-600">${item.name}${item.quantity > 1 ? ` × ${item.quantity}` : ''}</span>
                        <span class="text-sm font-medium">₹${item.price * item.quantity}</span>
                    </div>`;
            });
            itemsHTML += `
                <div class="border-t border-gray-200 my-2"></div>
                <div class="flex justify-between font-medium">
                    <span class="text-sm">Total</span>
                    <span class="text-sm">₹${cart.total}</span>
                </div>`;
            checkoutItems.innerHTML = itemsHTML;
            document.getElementById('checkout-modal').classList.add('active');
        }
    });

    // Preview buttons
    document.querySelectorAll('.preview-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const product = products[id];
            document.getElementById('preview-title').textContent = `${product.name} - Preview`;
            document.getElementById('preview-image').src = product.previewImage;
            
            const addToCartBtn = document.getElementById('preview-add-to-cart');
            addToCartBtn.setAttribute('data-id', product.id);
            addToCartBtn.setAttribute('data-name', product.name);
            addToCartBtn.setAttribute('data-price', product.price);
            
            document.getElementById('preview-modal').classList.add('active');
        });
    });

    // "Download Full Version" from preview modal
    document.getElementById('preview-add-to-cart').addEventListener('click', function() {
        document.getElementById('preview-modal').classList.remove('active');
        const id = this.getAttribute('data-id');
        const product = products[id];
        
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-rating').textContent = product.rating;
        document.getElementById('product-price').textContent = `₹${product.price}`;
        document.getElementById('product-original-price').textContent = `₹${product.originalPrice}`;

        const addToCartBtn = document.getElementById('product-add-to-cart');
        addToCartBtn.setAttribute('data-id', product.id);
        addToCartBtn.setAttribute('data-name', product.name);
        addToCartBtn.setAttribute('data-price', product.price);
        
        const downloadBtn = document.getElementById('product-download');
        downloadBtn.setAttribute('data-id', product.id);
        downloadBtn.setAttribute('data-name', product.name);
        downloadBtn.setAttribute('data-price', product.price);

        document.getElementById('product-modal').classList.add('active');
    });

    // "Download" buttons on product cards
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const product = products[id];

            document.getElementById('product-title').textContent = product.name;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-rating').textContent = product.rating;
            document.getElementById('product-price').textContent = `₹${product.price}`;
            document.getElementById('product-original-price').textContent = `₹${product.originalPrice}`;

            const addToCartBtn = document.getElementById('product-add-to-cart');
            addToCartBtn.setAttribute('data-id', product.id);
            addToCartBtn.setAttribute('data-name', product.name);
            addToCartBtn.setAttribute('data-price', product.price);

            const downloadBtn = document.getElementById('product-download');
            downloadBtn.setAttribute('data-id', product.id);
            downloadBtn.setAttribute('data-name', product.name);
            downloadBtn.setAttribute('data-price', product.price);
            
            document.getElementById('product-modal').classList.add('active');
        });
    });

    // "Add to Cart" from product details modal
    document.getElementById('product-add-to-cart').addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = parseInt(this.getAttribute('data-price'));
        cart.addItem(id, name, price);
        document.getElementById('product-modal').classList.remove('active');
    });
    
    // "Download Now" from product details modal (opens checkout for single item)
    document.getElementById('product-download').addEventListener('click', function() {
        document.getElementById('product-modal').classList.remove('active');
        const name = this.getAttribute('data-name');
        const price = parseInt(this.getAttribute('data-price'));
        
        document.getElementById('checkout-items').innerHTML = `
            <div class="flex justify-between mb-2">
                <span class="text-sm text-gray-600">${name}</span>
                <span class="text-sm font-medium">₹${price}</span>
            </div>
            <div class="border-t border-gray-200 my-2"></div>
            <div class="flex justify-between font-medium">
                <span class="text-sm">Total</span>
                <span class="text-sm">₹${price}</span>
            </div>`;

        document.getElementById('checkout-modal').classList.add('active');
    });
    
    // --- MODAL CLOSE BUTTONS & FLOW ---

    document.getElementById('close-preview').addEventListener('click', () => document.getElementById('preview-modal').classList.remove('active'));
    document.getElementById('close-product').addEventListener('click', () => document.getElementById('product-modal').classList.remove('active'));
    document.getElementById('close-checkout').addEventListener('click', () => document.getElementById('checkout-modal').classList.remove('active'));
    
    document.getElementById('complete-payment').addEventListener('click', () => {
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('success-modal').classList.add('active');
    });

    document.getElementById('download-materials').addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('active');
        // In a real application, download would be initiated here.
    });

    document.getElementById('close-success').addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('active');
    });

});