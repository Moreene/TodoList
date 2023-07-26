// 登入
const loginEmail = document.querySelector(".loginEmail");
const loginPassword = document.querySelector(".loginPassword");
const loginBtn = document.querySelector(".loginBtn");
const loginURL = "https://hex-escape-room.herokuapp.com/api/user/signin";

loginBtn.addEventListener("click", function () {
    if (loginEmail.value.trim() === "" || loginPassword.value.trim() === "") {
        alert("請輸入帳號密碼");
        return;
    }
    login();
});

function login() {
    let loginInfo = {
        email: loginEmail.value,
        password: loginPassword.value
    };

    axios.post(loginURL, loginInfo)
        .then(function (response) {
            alert(response.data.message);
            loginEmail.value = "";
            loginPassword.value = "";
            if (response.data.success === false) {
                return;
            } else {
                countDown();
            };
        })
        .catch(function (error) {
            console.log(error);
        });
};

//頁面跳轉
let count = 3;
function countDown() {
    setTimeout(function () {
        location.href = "./todoList.html";
    }, count * 1000);
};