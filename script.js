const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc_amt");
const exp_amt = document.querySelector("#exp_amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

const dummyData = [
  { id: 1, description: "Salary", amount: 25000 },
  { id: 2, description: "Groceries", amount: -150 },
  { id: 3, description: "Rent", amount: -1000 },
  { id: 4, description: "Freelance", amount: -800 },
  { id: 5, description: "Investment", amount: -5000 },
];
let transactions = dummyData;
let nextTransactionId =
  Math.max(...transactions.map((transaction) => transaction.id)) + 1;
function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
        ${transaction.description} <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="btn-del" type="button" aria-label="Delete ${transaction.description}">x</button>
    `;
  item
    .querySelector(".btn-del")
    .addEventListener("click", () => removeTrans(transaction.id));
  trans.appendChild(item);
}
function removeTrans(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    config();
  } else {
  }
}
function updateAmounts() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  balance.innerText = `₹${total}`;
  inc_amt.innerText = `₹${income}`;
  exp_amt.innerText = `₹${expense}`;
}
function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmounts();
}
function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please provide both description and amount.");
  } else {
    const transaction = {
      id: nextTransactionId++,
      description: description.value.trim(),
      amount: parseFloat(amount.value.trim()),
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    updateAmounts();
    description.value = "";
    amount.value = "";
  }
}
form.addEventListener("submit", addTransaction);
window.addEventListener("load", function () {
  config();
});
