document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorConfirmPassword = document.getElementById('errorConfirmPassword');
    const showHideButton=document.getElementById('show-hide');

    loginForm.addEventListener('submit', function (evento) {
        evento.preventDefault();
        validateForm()
    })

    emailInput.addEventListener('blur', function () { //blur es un evento que se dispara al salir del campo
        validateEmail()
    })
    emailInput.addEventListener('change', function () {
        clearError(errorEmail);
    })

    passwordInput.addEventListener('focusout', function () {
            validatePassword();
    })
    passwordInput.addEventListener('change', function () {
        clearError(errorPassword);
    })

    confirmPasswordInput.addEventListener('blur', function () {
        validatePasswordMatch();
    })
    confirmPasswordInput.addEventListener('change', function () {
        clearError(errorConfirmPassword);
    })

    showHideButton.addEventListener('click',function(){
        if(passwordInput.type=='password'){
            passwordInput.type='text';
            confirmPasswordInput.type='text'
        }else{
            passwordInput.type='password';
            confirmPasswordInput.type='password'
        }
    })


    function validateForm() {
        const isValidMail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidMail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            alert('Has ingresado con exito');
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // regex para validar email
        const emailValue = emailInput.value.trim() // elimina espacio al comienzo y final
        if (!emailRegex.test(emailValue)) {
            showError(errorEmail, "Ingresa Email Valido")
            return false
        }
        return true
    }



    function validatePassword() {
        const paswordValue = passwordInput.value.trim()
        if (paswordValue.length < 6) {
            showError(errorPassword, 'La contraseña debe tener añ menos 6 caracteres')
            return false;
        }
        return true

    }
    function validatePasswordMatch() {
        const paswordValue = passwordInput.value.trim()
        const paswordConfirmValue = confirmPasswordInput.value.trim()

        if (paswordValue != paswordConfirmValue) {
            showError(errorConfirmPassword, 'Las contraseñas no coinciden')
            return false
        }
        return true
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage(){
        const emailValue=emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body=bodyBuilderJSON();
        console.log(body);
    }
    function bodyBuilderJSON(){
        return{
            "email":emailInput.value,
            "password":passwordInput.value
        }
    }

})