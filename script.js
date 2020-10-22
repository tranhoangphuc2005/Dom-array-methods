let main = document.getElementById("main");
let addUserBtn = document.getElementById("add-user");
let doubleBtn = document.getElementById("double");
let showMillionairesBtn = document.getElementById("show-millionaires");
let sortBtn = document.getElementById("sort");
let calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  let res = await fetch("https://randomuser.me/api");
  let data = await res.json();

  let user = data.results[0];

  let newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double eveyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  let wealth = data.reduce((acc, user) => acc + user.money, 0);

  let weathEl = document.createElement("div");
  weathEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  let total = main.appendChild(weathEl);
}

// Add new obj to data arr

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div

  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    let element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
