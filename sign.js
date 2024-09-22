document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let messageElement = document.getElementById('message');

    if (name.length <= 3) {
        messageElement.textContent = 'يجب أن يحتوي الاسم على أكثر من 3 أحرف.';
        return;
    }

    if (password.length <= 7) {
        messageElement.textContent = 'يجب أن تحتوي كلمة المرور على 8 احرف او اكثر.';
        return;
    }

    fetch('https://66e7e68bb17821a9d9da6e50.mockapi.io/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = 'سيتم توجيهك إلى صفحة تسجيل الدخول...';
        setTimeout(() => {
            window.location.href = 'log.html';
        }, 2000);
    })
    .catch(err => {
        messageElement.textContent = 'حدث خطأ ما. الرجاء المحاولة مرة أخرى.';
    });
});
