const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');
const formBtn = document.querySelector('#form-btn');
const loader = document.querySelector('#loader');

form.addEventListener('submit', async e => {
    e.preventDefault();
    formBtn.classList.add('hidden');
    loader.classList.remove('hidden');
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value,
        };
        // eslint-disable-next-line no-undef
        await axios.post('/api/login', user);
        formBtn.classList.remove('hidden');
        loader.classList.add('hidden');
        window.location.pathname = '/todos/';
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
        formBtn.classList.remove('hidden');
        loader.classList.add('hidden');
    }
});