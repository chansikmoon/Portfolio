const fromCurrencyEle = document.getElementById('currecy_from');
const fromAmountEle = document.getElementById('amount_from');
const toCurrencyEle = document.getElementById('currecy_to');
const toAmountEle = document.getElementById('amount_to');

const rateEle = document.getElementById('rate');
const swapEle = document.getElementById('swap');

function calculate() {
    const fromCurrencyAbbr = fromCurrencyEle.value;
    const toCurrencyAbbr = toCurrencyEle.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrencyAbbr}`)
    .then(ret => ret.json())
    .then(data => {
        const currencyRate = data.rates[toCurrencyAbbr];
        rateEle.innerText = `1 ${fromCurrencyAbbr} = ${currencyRate} ${toCurrencyAbbr}`;

        toAmountEle.value = (fromAmountEle.value * currencyRate).toFixed(2);
    });
}

fromCurrencyEle.addEventListener('change', calculate);
fromAmountEle.addEventListener('input', calculate);
toCurrencyEle.addEventListener('change', calculate);
toAmountEle.addEventListener('input', calculate);

swapEle.addEventListener('click', () => {
    const tmpAbbr = fromCurrencyEle.value;
    fromCurrencyEle.value = toCurrencyEle.value;
    toCurrencyEle.value = tmpAbbr;

    const tmpAmt = fromAmountEle.value;
    fromAmountEle.value = toAmountEle.value;
    toAmountEle.value = tmpAmt;

    calculate();
});

calculate();