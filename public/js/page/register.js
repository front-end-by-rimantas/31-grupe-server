const registerFormDOM = document.getElementById('register_form');
const errorDOM = registerFormDOM.querySelector('.error');
const inputsDOM = registerFormDOM.querySelectorAll('[name]');
const submitDOM = registerFormDOM.querySelector('button[type="submit"]');

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
                console.log(xhttp.responseText);
            }
        };
        xhttp.open("POST", "/api/user", true);
        xhttp.send(JSON.stringify(formData));
    } else {
        errorDOM.style.display = 'block';
    }
})