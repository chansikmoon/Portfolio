const main = document.getElementById('main');
const add__user__btn = document.getElementById('aside__add__user');
const double__btn = document.getElementById('aside__double');
const show__millionaires__btn = document.getElementById('aside__show__millionaires');
const sort__btn = document.getElementById('aside__sort');
const calculate__wealth__btn = document.getElementById('aside__calculate__wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const ret = await fetch('https://randomuser.me/api');
    const data = await ret.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2};
    })

    updateDOM();
}

function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money);

    updateDOM();
}

function filterOnlyMilliionaires() {
    data = data.filter(user => user.money >= 1000000);

    updateDOM();
}

function calulcateAllWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEle = document.createElement('div');
    wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEle);
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

add__user__btn.addEventListener('click', getRandomUser);
double__btn.addEventListener('click', doubleMoney);
sort__btn.addEventListener('click', sortByRichest);
show__millionaires__btn.addEventListener('click', filterOnlyMilliionaires);
calculate__wealth__btn.addEventListener('click', calulcateAllWealth);