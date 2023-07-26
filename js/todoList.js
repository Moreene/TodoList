const logOutBtn = document.querySelector(".logOutBtn");
let userName = document.querySelector(".userName");
const inputText = document.querySelector(".inputText");
const addBtn = document.querySelector(".btn_add");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const countNum = document.querySelector(".countNum");
const clearBtn = document.querySelector(".clearBtn");
const pressEnter = function (e) {
    if (e.key === "Enter") {
        addTodo();
    };
};

// 使用localStorage帶入用戶名稱
userName.textContent = localStorage.getItem("userName");

// 使用localStorage儲存待辦事項，頁面刷新時保留資料
let allData = JSON.parse(localStorage.getItem('allData')) || [];
let showData = JSON.parse(localStorage.getItem('showData')) || [];

// 新增資料
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    if (inputText.value.trim() === "") {
        alert("請輸入待辦事項!");
        return;
    };
    let newData = {
        id: new Date().getTime().toString(),
        checked: "",
        content: inputText.value
    };
    allData.unshift(newData);
    renderData(showData);
    filterData();
    localStorage.setItem('allData', JSON.stringify(allData));
};

inputText.addEventListener("keydown", pressEnter);

// 渲染畫面
function renderData(todo) {
    let str = "";
    todo.forEach(function (item) {
        str += `
        <li data-id="${item.id}">
            <label class="checkbox" for="">
            <input type="checkbox" ${item.checked}/>
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete"></a>
        </li>     
        `;
    });
    list.innerHTML = str;
    inputText.value = "";
};

// tab 指向 + active
let toggleTab = "all";
tab.addEventListener("click", function (e) {
    toggleTab = e.target.getAttribute("data-tab");
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach(function (item) {
        item.classList.remove("active");
    });
    e.target.classList.add("active");
    filterData();
});

// 刪除資料 + 切換打勾功能
list.addEventListener("click", function (e) {
    let clickedId = e.target.closest("li").getAttribute("data-id");
    let idx = allData.findIndex(function (item) {
        return item.id === clickedId
    });
    if (e.target.classList.contains("delete")) {
        e.preventDefault();
        allData.splice(idx, 1);
    } else {
        if (allData[idx].checked === "") {
            allData[idx].checked = "checked"
        } else {
            allData[idx].checked = ""
        }
    };
    filterData();
});

// tab資料分類
function filterData() {
    if (toggleTab === "all") {
        showData = allData;
    } else if (toggleTab === "work") {
        showData = allData.filter(function (item) {
            return item.checked === "";
        });
    } else {
        showData = allData.filter(function (item) {
            return item.checked === "checked";
        });
    };
    // 未完成數量
    let workLength = allData.filter(function (item) {
        return item.checked === "";
    });
    countNum.textContent = workLength.length;
    renderData(showData);
    // 使用localStorage儲存渲染的待辦事項
    localStorage.setItem('showData', JSON.stringify(showData));
};


// 清除已完成item
filterData();
clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    allData = allData.filter(function (item) {
        return item.checked === "";
    });
    filterData();
});

// 登出系統
logOutBtn.addEventListener("click", function () {
    alert("即將登出此系統!");
    countDown();
    localStorage.clear();
});

let count = 3;
function countDown() {
    setTimeout(function () {
        location.href = "./index.html";
    }, count * 1000);
};