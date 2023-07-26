// 註冊
const signUpEmail = document.querySelector(".signUpEmail");
const nickName = document.querySelector(".nickName");
const signUpPassword = document.querySelector(".signUpPassword");
const signUpPasswordAgain = document.querySelector(".signUpPasswordAgain");
const signUpBtn = document.querySelector(".signUpBtn");
const signUpURL = "https://hex-escape-room.herokuapp.com/api/user/signup";

signUpBtn.addEventListener("click", function () {
    if (signUpEmail.value.trim() === "" || nickName.value.trim() === "" || signUpPassword.value.trim() === "" || signUpPasswordAgain.value.trim() === "") {
        alert("請檢查是否有未輸入的項目!");
        return;
    } else if (signUpPassword.value.trim() !== signUpPasswordAgain.value.trim()) {
        alert("再次輸入密碼錯誤!");
        return;
    };
    signUp();
});

function signUp() {
    let signUpInfo = {
        email: signUpEmail.value,
        nickName: nickName.value,
        password: signUpPassword.value,
        passwordCheck: signUpPasswordAgain.value
    };

    axios.post(signUpURL, signUpInfo)
        .then(function (response) {
            alert(response.data.message);
            signUpEmail.value = "";
            nickName.value = "";
            signUpPassword.value = "";
            signUpPasswordAgain.value = "";
            if (response.data.success === false) {
                return;
            } else {
                // 使用localStorage儲存用戶名稱
                localStorage.setItem("userName", signUpInfo.nickName);
                countDown();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

//頁面跳轉
let count = 3;
function countDown() {
    setTimeout(function () {
        location.href = "./index.html";
    }, count * 1000);
};