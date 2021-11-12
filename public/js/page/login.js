const loginFormDOM = document.getElementById('login_form');
const errorDOM = loginFormDOM.querySelector('.error');
const inputsDOM = loginFormDOM.querySelectorAll('[name]');
const submitDOM = loginFormDOM.querySelector('button[type="submit"]');

function nonEmptyString(text) {
    return typeof text === 'string' && text !== '';
}

submitDOM.addEventListener('click', (e) => {
    e.preventDefault();
    errorDOM.style.display = 'none';

    const formData = {};
    for (const inputDOM of inputsDOM) {
        formData[inputDOM.name] = inputDOM.value;
    }

    let isValid = true;
    for (const key in formData) {
        if (!nonEmptyString(formData[key])) {
            isValid = false;
        }
    }

    if (isValid) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                location.href = '../';
            }
        };
        xhttp.open("POST", "/api/token", true);
        xhttp.send(JSON.stringify(formData));
    } else {
        errorDOM.style.display = 'block';
    }
})