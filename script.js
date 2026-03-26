// INIT APP (runs on every page)
function initApp() {
    checkUser();
    loadTheme();
}

// LOGIN SYSTEM
function login() {
    let user = document.getElementById("username").value;

    if (user.trim() === "") {
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", user);
    window.location.href = "index.html";
}


function checkUser() {
    let user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "login.html";
    } else {
        let welcome = document.getElementById("welcome");
        if (welcome) {
            welcome.innerText = "Welcome, " + user;
            alert("Welcome to Group 1 Wages Calculator App.")
        }
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// THEME
function toggleTheme() {
    let theme = localStorage.getItem("theme");

    if (theme === "light") {
        localStorage.setItem("theme", "dark");
        document.body.classList.remove("light");
    } else {
        localStorage.setItem("theme", "light");
        document.body.classList.add("light");
    }
}

function loadTheme() {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
        document.body.classList.add("light");
    }
}

// BASIC CALCULATOR
function basicCalc() {
    let h = Number(document.getElementById("hours").value);
    let r = Number(document.getElementById("rate").value);

    if (isNaN(h) || isNaN(r) || h <= 0 || r <= 0) {
        alert("Invalid input");
        return;
    }

    let total = h * r;

    document.getElementById("result").innerText =
        "Total: $" + total.toFixed(2);

    saveHistory(total);
}

// ADVANCED CALCULATOR
function advancedCalc() {
    let h = Number(document.getElementById("hours").value);
    let r = Number(document.getElementById("rate").value);
    let o = Number(document.getElementById("overtime").value);
    let b = Number(document.getElementById("bonus").value);
    let t = Number(document.getElementById("tax").value);

    if (isNaN(h) || isNaN(r)) {
        alert("Invalid input");
        return;
    }

    let gross = (h * r) + (o * r * 1.5) + b;
    let taxAmt = gross * (t / 100);
    let net = gross - taxAmt;

    document.getElementById("result").innerText =
        `Gross: $${gross.toFixed(2)}
Tax: $${taxAmt.toFixed(2)}
Net: $${net.toFixed(2)}`;

    saveHistory(net);
}

// HISTORY
function saveHistory(val) {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    data.push(val);
    localStorage.setItem("history", JSON.stringify(data));
}

function loadHistory() {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let list = document.getElementById("historyList");

    list.innerHTML = "";

    data.forEach(v => {
        let li = document.createElement("li");
        li.innerText = "$" + v;
        list.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
}

// CHART
function loadChart() {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let chart = document.getElementById("chart");

    chart.innerHTML = "";

    data.slice(-5).forEach(v => {
        let bar = document.createElement("div");
        bar.style.height = (v / 5) + "px";
        chart.appendChild(bar);
    });
}

// DOWNLOAD PAYSLIP
function downloadPayslip() {
    let text = document.getElementById("result").innerText;

    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "payslip.txt";
    a.click();
}