// ページロード時にモーダルを表示
window.onload = function () {
    const modal = document.getElementById('consentModal');
    if (modal) {
        modal.style.display = 'flex'; // モーダルを表示する
    }
};

// 同意ボタンのクリック処理
document.getElementById('consentButton').addEventListener('click', function () {
    const modal = document.getElementById('consentModal');
    if (modal) {
        modal.style.display = 'none'; // モーダルを非表示にする
    }

    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'flex'; 
    }
});

document.getElementById('experimentForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('メールアドレスとパスワードを入力してください');
        return;
    }

    fetch('/save-experiment-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);

            window.location.href = `camera.html?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        })
        .catch(error => console.error('Error:', error));
});


