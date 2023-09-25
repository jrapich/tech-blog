const usernameInput = document.querySelector('#usernameInput').value.trim();
const passwordInput = document.querySelector('#passwordInput').value.trim();
const loginText = document.querySelector('#userHelp');
const btn = document.querySelector('#loginSubmit');

const redirect = () => {
    setTimeout(() => {
        console.log(`user ${usernameInput} verified ! logging in...`);
        loginText.textContent = 'Success! Logging you in...' 
        document.location.replace('/');
    }, 3000); 
}

btn.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usernameInput, passwordInput }),
        headers: { 'Content-Type': 'application/json' },
      });
    const res = response.json();
    console.log(res);

    (response.ok) ? redirect() : loginText.textContent = res.message;
      
});
