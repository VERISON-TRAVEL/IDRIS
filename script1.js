// Global variables
let cart = JSON.parse(localStorage.getItem('travelCart')) || [];
let currentCategory = '';

// --------- Currency helper ---------
const CURRENCY = 'DA';
function formatPrice(n){
  // ensure numeric and no extra decimals for whole numbers
  const num = typeof n === 'number' ? n : parseFloat(n) || 0;
  return `${Math.round(num)} ${CURRENCY}`;
}

// Sample data for destinations
const destinations = {
    national: [
        {
            id: 'n1',
            name: 'Sahara Desert Adventure',
            description: 'Experience the magic of the Sahara with camel trekking, desert camping, and stunning sunrises.',
            price: 450,
            duration: '3 days',
            location: 'Tamanrasset',
            image: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Adventure'
        },
        {
            id: 'n2',
            name: 'Algiers Historical Tour',
            description: 'Discover the rich history and culture of Algiers with guided tours of the Casbah and museums.',
            price: 180,
            duration: '2 days',
            location: 'Algiers',
            image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Cultural'
        },
        {
            id: 'n3',
            name: 'Constantine Bridges Tour',
            description: 'Explore the city of bridges with breathtaking views and historical significance.',
            price: 220,
            duration: '2 days',
            location: 'Constantine',
            image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Scenic'
        },
        {
            id: 'n4',
            name: 'Tlemcen Cultural Heritage',
            description: 'Immerse yourself in the cultural heritage of Tlemcen with its mosques and traditional crafts.',
            price: 200,
            duration: '3 days',
            location: 'Tlemcen',
            image: 'https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Cultural'
        }
    ],
    international: [
        {
            id: 'i1',
            name: 'Paris Romance Package',
            description: 'Experience the city of love with guided tours, river cruises, and romantic dining.',
            price: 1200,
            duration: '5 days',
            location: 'Paris, France',
            image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Romance'
        },
        {
            id: 'i2',
            name: 'Istanbul Grand Tour',
            description: 'Discover the beauty of Istanbul with visits to historic sites, bazaars, and Bosphorus cruise.',
            price: 800,
            duration: '4 days',
            location: 'Istanbul, Turkey',
            image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Cultural'
        },
        {
            id: 'i3',
            name: 'Dubai Luxury Experience',
            description: 'Enjoy luxury shopping, desert safaris, and stunning architecture in Dubai.',
            price: 1500,
            duration: '4 days',
            location: 'Dubai, UAE',
            image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Luxury'
        },
        {
            id: 'i4',
            name: 'Rome Ancient Wonders',
            description: 'Walk through history in Rome with guided tours of the Colosseum, Vatican, and more.',
            price: 950,
            duration: '4 days',
            location: 'Rome, Italy',
            image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Historical'
        },
        {
            id: 'i5',
            name: 'London Explorer',
            description: 'Discover London\'s iconic landmarks, museums, and royal palaces.',
            price: 1100,
            duration: '5 days',
            location: 'London, UK',
            image: 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Cultural'
        },
        {
            id: 'i6',
            name: 'Bangkok Adventure',
            description: 'Experience the vibrant culture, temples, and cuisine of Bangkok.',
            price: 700,
            duration: '4 days',
            location: 'Bangkok, Thailand',
            image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Adventure'
        }
    ],
    omra: [
        {
            id: 'o1',
            name: 'Omra Premium Package',
            description: 'Complete Omra experience with 5-star accommodation, guided tours, and spiritual guidance.',
            price: 2500,
            duration: '10 days',
            location: 'Mecca & Medina',
            image: 'https://images.pexels.com/photos/6540659/pexels-photo-6540659.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Spiritual'
        },
        {
            id: 'o2',
            name: 'Omra Standard Package',
            description: 'Affordable Omra package with comfortable accommodation and essential services.',
            price: 1800,
            duration: '8 days',
            location: 'Mecca & Medina',
            image: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Spiritual'
        },
        {
            id: 'o3',
            name: 'Omra Family Package',
            description: 'Special family package with child-friendly services and group activities.',
            price: 2200,
            duration: '9 days',
            location: 'Mecca & Medina',
            image: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Family'
        },
        {
            id: 'o4',
            name: 'Omra VIP Package',
            description: 'Luxury Omra experience with VIP services, private transportation, and premium accommodation.',
            price: 3500,
            duration: '12 days',
            location: 'Mecca & Medina',
            image: 'https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800',
            category: 'Luxury'
        }
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateCartDisplay();
    setupEventListeners();
    
    // Check if we're on category page
    if (window.location.pathname.includes('category.html')) {
        loadCategoryPage();
    }
    
    // Check if we're on booking page
    if (window.location.pathname.includes('booking.html')) {
        loadBookingPage();
    }
}

function setupEventListeners() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cart icon
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartModal);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', closeCartModal);
    }
    
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Filter functionality
    const sortFilter = document.getElementById('sortFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

// Navigation functions
function openCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'category.html';
}

function loadCategoryPage() {
    const category = localStorage.getItem('selectedCategory') || 'national';
    currentCategory = category;
    
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    
    const categoryInfo = {
        national: {
            title: 'National Tours',
            description: 'Discover the beauty and culture of Algeria'
        },
        international: {
            title: 'International Tours', 
            description: 'Explore amazing destinations around the world'
        },
        omra: {
            title: 'Omra Packages',
            description: 'Sacred journeys to the holy cities'
        }
    };
    
    if (categoryTitle && categoryDescription) {
        categoryTitle.textContent = categoryInfo[category].title;
        categoryDescription.textContent = categoryInfo[category].description;
    }
    
    displayDestinations(destinations[category]);
}

function displayDestinations(destinationList) {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    destinationList.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    
    card.innerHTML = `
        <div class="destination-image">
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-badge">${destination.category}</div>
        </div>
        <div class="destination-content">
            <h3 class="destination-title">${destination.name}</h3>
            <p class="destination-description">${destination.description}</p>
            <div class="destination-details">
                <div class="destination-duration">
                    <i class="fas fa-clock"></i>
                    ${destination.duration}
                </div>
                <div class="destination-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${destination.location}
                </div>
            </div>
            <div class="destination-price">
                <div>
                    <span class="price-amount">${formatPrice(destination.price)}</span>
                    <span class="price-per">per person</span>
                </div>
            </div>
            <div class="destination-actions">
                <button class="btn btn-outline btn-sm" onclick="addToCart('${destination.id}')">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-primary btn-sm" onclick="bookNow('${destination.id}')">
                    <i class="fas fa-calendar"></i> Book Now
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function applyFilters() {
    const category = currentCategory;
    if (!category || !destinations[category]) return;
    
    let filteredDestinations = [...destinations[category]];
    
    // Apply price filter
    const priceFilter = document.getElementById('priceFilter')?.value;
    if (priceFilter && priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
        filteredDestinations = filteredDestinations.filter(dest => {
            if (max) {
                return dest.price >= parseInt(min) && dest.price <= parseInt(max);
            } else {
                return dest.price >= parseInt(min);
            }
        });
    }
    
    // Apply sort
    const sortFilter = document.getElementById('sortFilter')?.value;
    if (sortFilter) {
        filteredDestinations.sort((a, b) => {
            switch (sortFilter) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'duration':
                    return parseInt(a.duration) - parseInt(b.duration);
                default:
                    return 0;
            }
        });
    }
    
    displayDestinations(filteredDestinations);
}

// Cart functions
function addToCart(destinationId) {
    const destination = findDestinationById(destinationId);
    if (!destination) return;
    
    const existingItem = cart.find(item => item.id === destinationId);
    if (existingItem) {
        showNotification('Item already in cart!', 'warning');
        return;
    }
    
    cart.push(destination);
    localStorage.setItem('travelCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Added to cart successfully!', 'success');
}

function removeFromCart(destinationId) {
    cart = cart.filter(item => item.id !== destinationId);
    localStorage.setItem('travelCart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartModal();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('active');
        updateCartModal();
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        // Show zero price
        cartTotal.textContent = `0 ${CURRENCY}`;
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.location} • ${item.duration}</p>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-price">${formatPrice(item.price)}</span>
                <button onclick="removeFromCart('${item.id}')" class="btn-remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `${Math.round(total)}`;
    // If your HTML already contains a currency label (e.g. "DZ<span id='cartTotal'>"), remove that label to avoid duplication.
    // Preferred: set HTML to "Total: <span id='cartTotal'></span> DA" and keep this line as numeric; or set:
    // cartTotal.textContent = formatPrice(total);
    // Uncomment the next line if you want the span to include the currency:
    // cartTotal.textContent = formatPrice(total);
}

function proceedToBooking() {
    if (cart.length === 0) {
        showNotification('Please add items to cart first!', 'warning');
        return;
    }
    
    localStorage.setItem('bookingItems', JSON.stringify(cart));
    window.location.href = 'booking.html';
}

function bookNow(destinationId) {
    const destination = findDestinationById(destinationId);
    if (!destination) return;
    
    localStorage.setItem('bookingItems', JSON.stringify([destination]));
    window.location.href = 'booking.html';
}

// Booking functions
function loadBookingPage() {
    const bookingItems = JSON.parse(localStorage.getItem('bookingItems')) || [];
    
    if (bookingItems.length === 0) {
        window.location.href = 'programs.html';
        return;
    }
    
    displayBookingSummary(bookingItems);
    setupBookingForm();
}

function displayBookingSummary(items) {
    const selectedPackage = document.getElementById('selectedPackage');
    const basePrice = document.getElementById('basePrice');
    const totalPrice = document.getElementById('totalPrice');
    
    if (!selectedPackage || !basePrice || !totalPrice) return;
    
    let total = 0;
    selectedPackage.innerHTML = '';
    
    items.forEach(item => {
        total += item.price;
        const packageDiv = document.createElement('div');
        packageDiv.className = 'package-info';
        packageDiv.innerHTML = `
            <div class="package-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="package-details">
                <h4>${item.name}</h4>
                <p>${item.location} • ${item.duration}</p>
                <p><strong>${formatPrice(item.price)}</strong> per person</p>
            </div>
        `;
        selectedPackage.appendChild(packageDiv);
    });
    
    basePrice.textContent = formatPrice(total);
    totalPrice.textContent = formatPrice(total);
    
    // Update total when transportation is selected
    const transportationCheckbox = document.getElementById('transportation');
    const additionalServices = document.getElementById('additionalServices');
    
    if (transportationCheckbox && additionalServices) {
        transportationCheckbox.addEventListener('change', function() {
            const additionalCost = this.checked ? 150 : 0;
            additionalServices.textContent = formatPrice(additionalCost);
            totalPrice.textContent = formatPrice(total + additionalCost);
        });
    }
}

function setupBookingForm() {
    // Set minimum date to today
    const departureDate = document.getElementById('departureDate');
    const returnDate = document.getElementById('returnDate');
    
    if (departureDate) {
        const today = new Date().toISOString().split('T')[0];
        departureDate.min = today;
        
        departureDate.addEventListener('change', function() {
            if (returnDate) {
                returnDate.min = this.value;
            }
        });
    }
}

function updateTravelerForms() {
    const adults = parseInt(document.getElementById('adults')?.value || 0);
    const children = parseInt(document.getElementById('children')?.value || 0);
    const travelerForms = document.getElementById('travelerForms');
    
    if (!travelerForms) return;
    
    travelerForms.innerHTML = '';
    
    // Create forms for adults
    for (let i = 1; i <= adults; i++) {
        const form = createTravelerForm(`Adult ${i}`, `adult-${i}`);
        travelerForms.appendChild(form);
    }
    
    // Create forms for children
    for (let i = 1; i <= children; i++) {
        const form = createTravelerForm(`Child ${i}`, `child-${i}`);
        travelerForms.appendChild(form);
    }
}

function createTravelerForm(title, prefix) {
    const form = document.createElement('div');
    form.className = 'traveler-form';
    form.innerHTML = `
        <h5 class="traveler-header">${title}</h5>
        <div class="form-row">
            <div class="form-group">
                <label for="${prefix}-name">Full Name *</label>
                <input type="text" id="${prefix}-name" name="${prefix}-name" required>
            </div>
            <div class="form-group">
                <label for="${prefix}-passport">Passport Number</label>
                <input type="text" id="${prefix}-passport" name="${prefix}-passport">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="${prefix}-birth">Date of Birth *</label>
                <input type="date" id="${prefix}-birth" name="${prefix}-birth" required>
            </div>
            <div class="form-group">
                <label for="${prefix}-gender">Gender *</label>
                <select id="${prefix}-gender" name="${prefix}-gender" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </div>
    `;
    return form;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target);
    const bookingData = {
        departureDate: formData.get('departureDate'),
        returnDate: formData.get('returnDate'),
        roomType: formData.get('roomType'),
        adults: formData.get('adults'),
        children: formData.get('children'),
        contactName: formData.get('contactName'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        emergencyContact: formData.get('emergencyContact'),
        specialRequests: formData.get('specialRequests'),
        transportation: formData.has('transportation')
    };
    
    // Simulate booking process
    showBookingConfirmation(bookingData);
}

function showBookingConfirmation(bookingData) {
    // Generate a random booking reference
    const bookingRef = 'IBT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const message = `
        Booking Confirmed Successfully!
        
        Booking Reference: ${bookingRef}
        Departure Date: ${bookingData.departureDate}
        Contact: ${bookingData.contactName}
        
        We will contact you soon to confirm the details.
        A confirmation email will be sent to ${bookingData.contactEmail}
    `;
    
    alert(message);
    
    // Clear cart and redirect
    localStorage.removeItem('bookingItems');
    cart = [];
    localStorage.setItem('travelCart', JSON.stringify(cart));
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Utility functions
function findDestinationById(id) {
    for (const category in destinations) {
        const destination = destinations[category].find(d => d.id === id);
        if (destination) return destination;
    }
    return null;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .category-card, .destination-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollAnimations, 100);
});
