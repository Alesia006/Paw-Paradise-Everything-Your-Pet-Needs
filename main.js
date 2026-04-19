console.log('main.js u ngarkua');

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOGIN/REGISTER MODAL ==========
    const loginBtn = document.getElementById('loginBtn');
    const authModalEl = document.getElementById('authModal');
    let authModal;

    if (authModalEl && typeof bootstrap !== 'undefined') {
        authModal = new bootstrap.Modal(authModalEl);
    } else {
        console.error('Bootstrap nuk u ngarkua ose nuk gjendet authModal');
    }

    function updateLoginButton() {
        if (!loginBtn) return;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            loginBtn.innerHTML = `<i class="bi bi-person-check-fill"></i> <span class="d-none d-md-inline">${currentUser.name}</span>`;
        } else {
            loginBtn.innerHTML = `<i class="bi bi-person-circle"></i> <span class="d-none d-md-inline">Login</span>`;
        }
    }

    // Kliko Login -> hap modal ose logout
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('Login button clicked');
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                if (confirm('Do të dalësh nga llogaria?')) {
                    localStorage.removeItem('currentUser');
                    updateLoginButton();
                    alert('Dole me sukses!');
                }
            } else {
                if (authModal) {
                    authModal.show();
                } else {
                    alert('Gabim: Modal nuk u gjet. Kontrollo index.html');
                }
            }
        });
    }

    // LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Login i suksesshëm!');
                authModal.hide();
                updateLoginButton();
                loginForm.reset();
            } else {
                alert('Email ose password gabim!');
            }
        });
    }

    // REGISTER FORM
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.find(u => u.email === email)) {
                alert('Ky email ekziston!');
                return;
            }
            
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            alert('Regjistrim i suksesshëm!');
            authModal.hide();
            updateLoginButton();
            registerForm.reset();
        });
    }

    // ========== CART COUNT ==========
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateLoginButton();
    updateCartCount();
    
}); // fund DOMContentLoaded
// ========== CART COUNT ==========
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

updateCartCount();
