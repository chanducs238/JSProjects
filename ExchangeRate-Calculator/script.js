const currencyEL_One = document.getElementById('currency-one'); 
const amountEL_One = document.getElementById('amount-one'); 
const currencyEL_Two = document.getElementById('currency-two'); 
const amountEL_Two = document.getElementById('amount-two'); 
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate(){
    const currencyOne = currencyEL_One.value;
    const currencyTwo = currencyEL_Two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
       const exchangeRate = data.rates[currencyTwo];
       rate.innerText = `1 ${currencyOne} = ${exchangeRate} ${currencyTwo}`;
       amountEL_Two.value = (amountEL_One.value * exchangeRate).toFixed(2);
    })
}

//event listeners
currencyEL_One.addEventListener('change', calculate);
amountEL_One.addEventListener('input', calculate);
currencyEL_Two.addEventListener('change', calculate);
amountEL_Two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEL_One.value;
    currencyEL_One.value =  currencyEL_Two.value;
    currencyEL_Two.value = temp;
    calculate();
})
