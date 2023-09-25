const loginText = document.querySelector('#userHelp');
const btn = document.querySelector('#loginSubmit');
const form = document.querySelector('#submit');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usernameInput = document.querySelector('#usernameInput').value.trim();
    const passwordInput = document.querySelector('#passwordInput').value.trim();

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ 
            username: usernameInput, 
            password: passwordInput 
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    const redirect = () => {
        console.log(res.message);
        loginText.textContent = 'Success! Logging you in...';
        setTimeout(() => { 
            document.location.replace('/');
        }, 3000); 
    }

    (response.ok) ? redirect() : loginText.textContent = res.message;
      
});
