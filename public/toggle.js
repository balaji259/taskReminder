document.addEventListener("DOMContentLoaded", function () {
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    showSignup.addEventListener('click', function () {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', function () {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});
