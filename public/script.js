document.addEventListener('DOMContentLoaded', function () {
    // Handle Signup
    document.querySelector("#signup-submit").addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.querySelector("#signup-username").value;
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;

        axios.post("/user/register", {
            username,
            email,
            password
        })
        .then(res => {
            alert('Registration Successful!');
            // Optionally redirect to login page or clear the form
        })
        .catch(err => {
            alert('Registration Failed! ' + (err.response && err.response.data.message ? err.response.data.message : 'An error occurred.'));
        });
    });

    // Handle Login
    document.querySelector("#login-submit").addEventListener('click', (e) => {
        e.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        axios.post("/user/login", {
            email,
            password
        })
        .then(res => {
            // alert("Login successful!");
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId',res.data.userId);

            window.location.href = 'tasks.html';
            // Optionally redirect to another page or update UI
        })
        .catch(err => {
            alert('Login failed! ' + (err.response && err.response.data.message ? err.response.data.message : 'An error occurred.'));
        });
    });
});
