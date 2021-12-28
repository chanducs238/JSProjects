let form = document.getElementById('form');
let userName = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');


function showError(input, message){
    let parentElement = input.parentElement;
    parentElement.className = 'form-control error';
    let small = parentElement.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    let parentElement = input.parentElement;
    parentElement.className = 'form-control success';
}

function checkRequired(inputArr){
    inputArr.forEach((element) => {
        if(element.value.trim() === ''){
            showError(element, `${getfieldName(element)} is required`);
        } else {
            showSuccess(element);
        }
    })
}

function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getfieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getfieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function getfieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkEmail(email){
    const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(emailRegex.test(email.value)){
      showSuccess(email);
  } else {
    showError(email, `${getfieldName(email)} is not valid`)
  }
}

function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
        document.getElementById('password').value = '';
        document.getElementById('password2').value = '';
        checkLength(password, 6, 15);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([userName, email, password, password2]);
    checkEmail(email);
    checkLength(userName, 3, 15);
    checkLength(password, 6, 15);
    checkLength(password2, 6, 15);
    checkPasswordMatch(password, password2);
})