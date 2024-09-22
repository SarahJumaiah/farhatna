document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let messageElement = document.getElementById('message');

    
    if (email === '' || password === '') {
        messageElement.textContent = 'الرجاء تعبئة الحقول باللغة الإنجليزية.';
        return;
    }

    fetch('https://66e7e68bb17821a9d9da6e50.mockapi.io/login')
    .then(response => response.json())
    .then(users => {
        let user = users.find(user => user.email === email);
        
        if (!user) {
            
            messageElement.textContent = 'البريد الإلكتروني غير موجود.';
        } else if (user.password !== password) {
            
            messageElement.textContent = 'كلمة المرور غير صحيحة.';
        } else {
            
            sessionStorage.setItem('userId', user.id);
            sessionStorage.setItem('userName', user.name);
            sessionStorage.setItem('userEmail', user.email);
            window.location.href = 'home.html'; 
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        messageElement.textContent = 'حدث خطأ ما. الرجاء المحاولة لاحقًا.';
    });
});
