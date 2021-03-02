const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function getFormControl(input, className) {
    const formControl = input.parentElement;
    formControl.className = 'form__control ' + className;

    return formControl;
}

function showError(input, message) {
    const formControl = getFormControl(input, 'error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = getFormControl(input, 'success');
}

// Check required fields
function checkRequired(inputArr) {
    // console.log(inputArr);
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `Invalid ${getFieldname(input)}`);
        }
        else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldname(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldname(input)} must be at most ${max} characters`);
    }
    else {
        showSuccess(input);
    }
}

// Check email
function checkEmail(input) {
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Email is not valid');
    }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match');
    }
}

// Get fieldname
function getFieldname(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, confirmPassword);
});