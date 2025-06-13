document.addEventListener('DOMContentLoaded', function() {
    // Cart object
    const cart = {
        items: [],
        total: 0,
        addItem: function(id, name, price, image) {
            const existingItem = this.items.find(item => item.id === id);
            if (existingItem) {
                return;
            }
            this.items.push({ id, name, price, image });
            this.total += price;
            this.updateUI();
        },
        removeItem: function(id) {
            const itemIndex = this.items.findIndex(item => item.id === id);
            if (itemIndex === -1) {
                return;
            }
            this.total -= this.items[itemIndex].price;
            this.items.splice(itemIndex, 1);
            this.updateUI();
        },
        updateUI: function() {
            document.getElementById('cartCount').textContent = this.items.length;
            document.getElementById('cartTotal').textContent = `₹${this.total}`;
            const cartItemsContainer = document.getElementById('cartItems');
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
                document.getElementById('checkoutBtn').disabled = true;
            } else {
                let itemsHTML = '';
                this.items.forEach(item => {
                    itemsHTML += `
                    <div class="flex items-center justify-between p-3 border rounded-lg mb-3">
                        <div>
                            <h4 class="text-sm font-medium text-gray-800">${item.name}</h4>
                            <p class="text-sm text-primary font-medium">₹${item.price}</p>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 remove-item" data-id="${item.id}">
                            <i class="ri-delete-bin-line ri-lg"></i>
                        </button>
                    </div>`;
                });
                cartItemsContainer.innerHTML = itemsHTML;
                document.getElementById('checkoutBtn').disabled = false;
                const removeButtons = document.querySelectorAll('.remove-item');
                removeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        cart.removeItem(id);
                    });
                });
            }
        }
    };

    // Product data
    const products = {
        1: { title: 'CSE - Data Structures (4th Sem)', price: 129, originalPrice: 199, image: 'https://readdy.ai/api/search-image?query=Computer%20science%20textbook%20with%20data%20structures%20and%20algorithms%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=1&orientation=landscape', description: 'Complete study material for Data Structures and Algorithms. Includes comprehensive notes, algorithms explanation, time complexity analysis, and solved examples. Perfect for exam preparation and concept clarity.', addon: 'DSA Previous Year Questions', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        2: { title: 'CSE - DBMS Complete Notes (5th Sem)', price: 149, originalPrice: 249, image: 'https://readdy.ai/api/search-image?query=Database%20management%20system%20textbook%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=2&orientation=landscape', description: 'Comprehensive Database Management System notes covering SQL, normalization, transaction management, and more. Includes practical examples and case studies. Updated with the latest syllabus content.', addon: 'DBMS Lab Manual', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-line"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        3: { title: 'CSE - Operating Systems (5th Sem)', price: 139, originalPrice: 229, image: 'https://readdy.ai/api/search-image?query=Operating%20system%20textbook%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=3&orientation=landscape', description: 'Complete Operating Systems notes covering process management, memory management, file systems, and more. Includes diagrams, algorithms, and solved examples for better understanding.', addon: 'OS Practical Guide', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        4: { title: 'CSE - Software Engineering (6th Sem)', price: 119, originalPrice: 199, image: 'https://readdy.ai/api/search-image?query=Software%20engineering%20textbook%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=4&orientation=landscape', description: 'Comprehensive Software Engineering notes covering SDLC, agile methodologies, testing, and project management. Includes case studies and real-world examples from industry.', addon: 'SE Project Templates', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-line"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        5: { title: 'CSE - Computer Networks (6th Sem)', price: 129, originalPrice: 209, image: 'https://readdy.ai/api/search-image?query=Computer%20Networks%20textbook%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=12&orientation=landscape', description: 'Deep dive into computer networks with our comprehensive notes. Covers OSI model, TCP/IP, routing algorithms, and network security. Ideal for acing your semester exams.', addon: 'CN Lab Manual', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-line"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        6: { title: 'CSE - Machine Learning (7th Sem)', price: 159, originalPrice: 259, image: 'https://readdy.ai/api/search-image?query=Machine%20learning%20textbook%2C%20AI%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=13&orientation=landscape', description: 'Master Machine Learning with our detailed notes. Covers supervised, unsupervised, and reinforcement learning, with Python examples and practical projects.', addon: 'ML Project Ideas', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        7: { title: 'ME - Thermodynamics Lab Record', price: 99, originalPrice: 149, image: 'https://readdy.ai/api/search-image?query=Thermodynamics%20lab%20manual%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=14&orientation=landscape', description: 'A complete lab record for Thermodynamics, following the university syllabus. Includes procedures, observations, and calculations for all experiments.', addon: 'Viva Questions', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Syllabus Aligned</span><span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">PDF Format</span>`},
        8: { title: 'ECE - Digital Logic Design Notes', price: 119, originalPrice: 189, image: 'https://readdy.ai/api/search-image?query=Digital%20logic%20design%20textbook%2C%20circuits%2C%20professional%2C%20clean&width=400&height=250&seq=15&orientation=landscape', description: 'In-depth notes on Digital Logic Design. Covers Boolean algebra, logic gates, combinational and sequential circuits, and more. Perfect for ECE students.', addon: 'DLD PYQs', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Verified</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Updated for 2025</span>`},
        9: { title: 'CSE - Web Dev Project (Hostel MS)', price: 299, originalPrice: 499, image: 'https://readdy.ai/api/search-image?query=web%20development%20project%20source%20code%20on%20laptop%2C%20professional%2C%20clean&width=400&height=250&seq=16&orientation=landscape', description: 'A complete, deployable Hostel Management System project with source code. Built using modern web technologies. Includes documentation and setup guide.', addon: 'Project Synopsis', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-half-fill"></i>`, tagsHTML: `<span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">With Source Code</span><span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Deployable</span>`},
        10: { title: 'ECE - VLSI Learning Record', price: 79, originalPrice: 129, image: 'https://readdy.ai/api/search-image?query=vlsi%20design%20document%2C%20educational%20material%2C%20professional%2C%20clean&width=400&height=250&seq=17&orientation=landscape', description: 'Completed Learning Record for VLSI, ready for submission. Follows the latest university format, covering all required topics and experiments.', addon: 'Viva Questions', ratingHTML: `<i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-line"></i>`, tagsHTML: `<span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Ready to Submit</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Latest Format</span>`},
        combo1: { title: 'CSE 4th Sem - Complete Pack', price: 499, originalPrice: 999, image: 'https://readdy.ai/api/search-image?query=Stack%20of%20computer%20science%20textbooks%2C%20educational%20material%20bundle%2C%20professional%2C%20clean&width=400&height=200&seq=5&orientation=landscape', description: 'Complete package for CSE 4th Semester including notes, previous year questions, lab manuals, and practice problems for all subjects. Save 50% compared to buying individually.', addon: 'Semester Project Ideas', ratingHTML: ``, tagsHTML: `<span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">Best Value</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">All Subjects</span><span class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Topper Curated</span>`},
        combo2: { title: 'DBMS Master Pack', price: 249, originalPrice: 419, image: 'https://readdy.ai/api/search-image?query=Database%20management%20system%20textbooks%20and%20notes%2C%20educational%20material%20bundle%2C%20professional%2C%20clean&width=400&height=200&seq=6&orientation=landscape', description: 'Complete DBMS package including theory notes, lab manual, previous year questions, and project ideas. Perfect for mastering database concepts and acing your exams.', addon: 'SQL Query Cheat Sheet', ratingHTML: ``, tagsHTML: `<span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">Subject Master</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">All-in-One</span>`},
        combo3: { title: 'EEE Power Electronics Pack', price: 299, originalPrice: 549, image: 'https://readdy.ai/api/search-image?query=Electrical%20engineering%20textbooks%20and%20notes%2C%20educational%20material%20bundle%2C%20professional%2C%20clean&width=400&height=200&seq=7&orientation=landscape', description: 'Complete Power Electronics package for EEE students including theory notes, lab manual, circuit diagrams, simulation files, and project ideas. Updated with the latest syllabus.', addon: 'Circuit Simulation Files', ratingHTML: ``, tagsHTML: `<span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">Domain Specific</span><span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">All-in-One</span>`}
    };

    // --- FILTERING LOGIC ---
    const logoBtn = document.getElementById('logo-btn');
    const filterButtonsContainer = document.getElementById('filter-buttons-container');
    const branchSelect = document.getElementById('branch-select');
    const semesterSelect = document.getElementById('semester-select');
    const allProductCards = document.querySelectorAll('.product-card');
    const productSections = document.querySelectorAll('.product-section');
    const noResultsMessage = document.getElementById('no-results-message');

    function filterProducts() {
        const activeFilterBtn = filterButtonsContainer.querySelector('.filter-btn.active');
        const selectedCategory = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
        const selectedBranch = branchSelect.value;
        const selectedSemester = semesterSelect.value;

        allProductCards.forEach(card => {
            const cardCategories = (card.dataset.category || '').split(' ');
            const cardBranch = card.dataset.branch || '';
            const cardSemester = card.dataset.semester || '';

            const categoryMatch = selectedCategory === 'all' || cardCategories.includes(selectedCategory);
            const branchMatch = selectedBranch === '' || cardBranch === selectedBranch;
            const semesterMatch = selectedSemester === '' || cardSemester === selectedSemester;

            if (categoryMatch && branchMatch && semesterMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        let totalVisibleProducts = 0;
        productSections.forEach(section => {
            const visibleCardsInSection = section.querySelectorAll('.product-card[style*="display: block"]');
            if (visibleCardsInSection.length > 0) {
                section.style.display = 'block';
                totalVisibleProducts += visibleCardsInSection.length;
            } else {
                section.style.display = 'none';
            }
        });
        
        noResultsMessage.style.display = totalVisibleProducts === 0 ? 'block' : 'none';
    }

    function resetAllFilters() {
        // Deactivate current button
        const currentActive = filterButtonsContainer.querySelector('.filter-btn.active');
        if (currentActive) {
            currentActive.classList.remove('active', 'bg-primary', 'text-white');
            currentActive.classList.add('bg-gray-100', 'text-gray-700');
        }
        
        // Activate "All Materials" button
        const allMaterialsBtn = filterButtonsContainer.querySelector('[data-filter="all"]');
        if(allMaterialsBtn) {
            allMaterialsBtn.classList.add('active', 'bg-primary', 'text-white');
            allMaterialsBtn.classList.remove('bg-gray-100', 'text-gray-700');
        }

        // Reset dropdowns
        branchSelect.value = '';
        semesterSelect.value = '';

        // Apply filters
        filterProducts();
    }

    filterButtonsContainer.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.filter-btn');
        if (targetButton) {
            if(targetButton.dataset.filter === 'all') {
                resetAllFilters();
                return;
            }

            const currentActive = filterButtonsContainer.querySelector('.filter-btn.active');
            if (currentActive) {
                currentActive.classList.remove('active', 'bg-primary', 'text-white');
                currentActive.classList.add('bg-gray-100', 'text-gray-700');
            }
            
            targetButton.classList.add('active', 'bg-primary', 'text-white');
            targetButton.classList.remove('bg-gray-100', 'text-gray-700');
            
            filterProducts();
        }
    });

    branchSelect.addEventListener('change', filterProducts);
    semesterSelect.addEventListener('change', filterProducts);
    logoBtn.addEventListener('click', resetAllFilters);


    // --- MODAL AND CART LOGIC ---
    function openCheckoutModal(itemName, itemPrice) {
        document.getElementById('checkoutItemName').textContent = itemName;
        document.getElementById('checkoutItemPrice').textContent = `₹${itemPrice}`;
        document.getElementById('checkoutTotal').textContent = `₹${itemPrice}`;
        document.getElementById('qrAmount').textContent = itemPrice;
        document.getElementById('checkoutModal').classList.remove('hidden');
    }
    
    function openProductDetailModal(id) {
        const product = products[id];
        const modal = document.getElementById('productDetailModal');
        
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productPrice').textContent = `₹${product.price}`;
        document.getElementById('productOriginalPrice').textContent = `₹${product.originalPrice}`;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productRating').innerHTML = product.ratingHTML || '';
        document.getElementById('productTags').innerHTML = product.tagsHTML || '';

        const addonContainer = document.getElementById('productAddon');
        if (product.addon) {
            document.getElementById('addonTitle').textContent = product.addon;
            addonContainer.classList.remove('hidden');
        } else {
            addonContainer.classList.add('hidden');
        }
        
        document.getElementById('addToCartBtn').setAttribute('data-id', id);
        document.getElementById('downloadNowBtn').setAttribute('data-id', id);
        modal.classList.remove('hidden');
    }

    document.getElementById('cartIcon').addEventListener('click', () => document.getElementById('cartModal').classList.remove('hidden'));
    document.getElementById('closeCart').addEventListener('click', () => document.getElementById('cartModal').classList.add('hidden'));

    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.items.length > 0) {
            document.getElementById('cartModal').classList.add('hidden');
            const itemCount = cart.items.length;
            const itemName = itemCount === 1 ? cart.items[0].name : `${itemCount} Items`;
            openCheckoutModal(itemName, cart.total);
        }
    });

    document.getElementById('addToCartBtn').addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const product = products[id];
        cart.addItem(id, product.title, product.price, product.image);
        document.getElementById('productDetailModal').classList.add('hidden');
    });

    document.querySelectorAll('.preview-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const product = products[id];
            document.getElementById('previewTitle').textContent = product.title;
            document.getElementById('previewImage').src = product.image;
            document.getElementById('previewPrice').textContent = `₹${product.price} (₹${product.originalPrice})`;
            document.getElementById('previewModal').classList.add('active');
        });
    });

    document.getElementById('closePreview').addEventListener('click', () => document.getElementById('previewModal').classList.remove('active'));
    
    document.querySelectorAll('.download-btn, .combo-checkout-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            openProductDetailModal(id);
        });
    });

    document.getElementById('closeProductDetail').addEventListener('click', () => document.getElementById('productDetailModal').classList.add('hidden'));

    document.getElementById('downloadNowBtn').addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const product = products[id];
        document.getElementById('productDetailModal').classList.add('hidden');
        openCheckoutModal(product.title, product.price);
    });

    document.getElementById('closeCheckout').addEventListener('click', () => document.getElementById('checkoutModal').classList.add('hidden'));

    document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
        document.getElementById('successModal').classList.remove('hidden');
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'sample.pdf';
            link.click();
        }, 1500);
    });

    document.getElementById('closeSuccess').addEventListener('click', () => document.getElementById('successModal').classList.add('hidden'));

    cart.updateUI();
});
