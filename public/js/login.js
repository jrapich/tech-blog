const form = document.querySelector('#submit');
const signup = document.querySelector('#signup');

const redirect = (message, location) => {
    console.log(message);
    location.textContent = 'Success! Logging you in...';
    setTimeout(() => { 
        document.location.replace('/');
    }, 4000); 
}

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const usernameInput = document.querySelector('#usernameInput').value.trim();
        const passwordInput = document.querySelector('#passwordInput').value.trim();
        const loginText = document.querySelector('#userHelp');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ 
                username: usernameInput, 
                password: passwordInput 
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();

        (response.ok) ? redirect(res.message, loginText) : loginText.textContent = res.message;
        
    });
};

if (signup) {
    signup.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('#emailInput').value.trim();
        const username = document.querySelector('#usernameInput').value.trim();
        const password = document.querySelector('#passwordInput').value.trim();
        const passMessage = document.querySelector('#passwordHelp');

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ 
                email:email,
                username: username,
                password: password 
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();

        if (response.status === 418) {
            passMessage.setAttribute('style', "color:red;");
            passMessage.textContent = `\n
            Please enter a valid email, username, and password. \n
            Email must be valid format. \n
            Passwords must be at least 8 characters long. \n`
        };
        if (response.status === 409) {
            passMessage.setAttribute('style', "color:red;");
            passMessage.textContent = `That username already exists.`
        };

        (response.ok) ? redirect(res.message, passMessage) : passMessage.textContent = res.message;
        if (response.status === 500) {
            console.log(res);
        }
    });
};