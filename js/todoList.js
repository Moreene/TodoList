const logOutBtn = document.querySelector(".logOutBtn");
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

let allData = [];
let showData = [];

// 登出系統
logOutBtn.addEventListener("click", function () {
    alert("即將登出此系統!");
    logOutCountDown();
});

let count = 3;
function logOutCountDown() {
    document.getElementById("test").innerHTML = count;
    count -= 1;
    if (count === 0) {
        location.href = "./index.html";
    };
    setTimeout("logOutCountDown()", 1000);
};

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
    updateData();
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
    updateData();
});

// 刪除資料 + 切換打勾功能
list.addEventListener("click", function (e) {
    let clickedId = e.target.closest("li").getAttribute("data-id");
    if (e.target.classList.contains("delete")) {
        e.preventDefault();
        let idx = allData.findIndex(function (item) {
            return item.id === clickedId
        });
        allData.splice(idx, 1);
    } else {
        allData.forEach(function (item) {
            if (item.id === clickedId) {
                if (item.checked === "") {
                    item.checked = "checked";
                } else {
                    item.checked = "";
                };
            };
        });
    };
    updateData();
});

// tab資料分類
function updateData() {
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
};

updateData();

// 清除已完成item
clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    allData = allData.filter(function (item) {
        return item.checked === "";
    });
    updateData();
});