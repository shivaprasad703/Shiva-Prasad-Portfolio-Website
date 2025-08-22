const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

// Currency → Country mapping
const currencyInfo = {
  USD: { country: "United States", code: "us" },
  INR: { country: "India", code: "in" },
  EUR: { country: "European Union", code: "eu" },
  GBP: { country: "United Kingdom", code: "gb" },
  AUD: { country: "Australia", code: "au" },
  CAD: { country: "Canada", code: "ca" },
  JPY: { country: "Japan", code: "jp" },
  CNY: { country: "China", code: "cn" },
  CHF: { country: "Switzerland", code: "ch" },
  NZD: { country: "New Zealand", code: "nz" },
  ZAR: { country: "South Africa", code: "za" },
  BRL: { country: "Brazil", code: "br" },
};

// Load currency options
async function loadCurrencies() {
  const res = await fetch("https://api.frankfurter.app/currencies");
  const data = await res.json();

  for (let code in data) {
    if (currencyInfo[code]) {
      // only add mapped ones
      fromCurrency.innerHTML += `<option value="${code}">${currencyInfo[code].country} (${code})</option>`;
      toCurrency.innerHTML += `<option value="${code}">${currencyInfo[code].country} (${code})</option>`;
    }
  }

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
  updateFlags();
}

// Update flags when dropdown changes
function updateFlags() {
  fromFlag.src = `https://flagcdn.com/48x36/${
    currencyInfo[fromCurrency.value]?.code || "un"
  }.png`;
  toFlag.src = `https://flagcdn.com/48x36/${
    currencyInfo[toCurrency.value]?.code || "un"
  }.png`;
}

async function convertCurrency() {
  let amount = document.getElementById("amount").value;
  if (amount === "" || amount <= 0) {
    result.innerText = "⚠️ Please enter a valid amount.";
    return;
  }
  if (fromCurrency.value === toCurrency.value) {
    result.innerText = "⚠️ From and To currencies cannot be the same.";
    return;
  }

  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency.value}&to=${toCurrency.value}`
  );
  const data = await res.json();
  let converted = data.rates[toCurrency.value];
  result.innerText = `${amount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

loadCurrencies();
