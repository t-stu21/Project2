$(document).ready(function () {

    console.log('login test');

    let emailInput = $('#email');
    let passwordInput = $('#password');

    $(document).on('click', '#login', handleLoginSubmit);

    function handleLoginSubmit(event) {
        event.preventDefault();

        if (
            !passwordInput
                .val()
                .trim()
                .trim() ||
            !emailInput
                .val()
                .trim()
                .trim()
        ) {
            return;
        }

        const loginData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        console.log('loginData', loginData);

        loginNow(loginData);

        function loginNow(loginData) {
            $.post('/login', loginData).then(() => {
                window.location.href = "/"
            });
        }

    }



})