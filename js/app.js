const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const fromCoutryImg = document.querySelector(".from_coutry_img");
const toCoutryImg = document.querySelector(".to_coutry_img");

const amountInput = document.querySelector(".amount_input");

const convert = document.querySelector(".convert");
const ResultAmount = document.querySelector(".result_amount");

// for in country_list
for(let key in country_list) {
    const option = document.createElement("option");

    option.value = key;
    option.textContent = key;

    fromCurrency.appendChild(option);
}

for(let key in country_list) {
    const option = document.createElement("option");
    
    option.value = key;
    option.textContent = key;

    toCurrency.appendChild(option);    
}

fromCoutryImg.src = `https://flagcdn.com/w20/${country_list["USD"].toLowerCase()}.png`;
toCoutryImg.src = `https://flagcdn.com/w20/${country_list["UZS"].toLowerCase()}.png`;
toCurrency.value = "UZS"
fromCurrency.value = "USD"


fromCurrency.addEventListener("change", (e)=> {
        const selected = e.target.value;

    fromCoutryImg.src = `https://flagcdn.com/w20/${country_list[selected].toLowerCase()}.png`;
})

toCurrency.addEventListener("change", (e)=> {
    const selected = e.target.value;

    toCoutryImg.src = `https://flagcdn.com/w20/${country_list[selected].toLowerCase()}.png`;
})


async function getData() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/f90a76a05aeaccbd27c1e99d/latest/USD`);

        if(!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json();

        console.log(data);
    
    convert.addEventListener("click", (e) => {

        e.preventDefault();
        if(amountInput.value === "") {
            ResultAmount.textContent = "Please enter an amount"
            ResultAmount.style.color = "red";

            setTimeout(() => {
                ResultAmount.textContent = "";
                ResultAmount.style.color = "black";
            }, 1000)
        } else {

            let fromCur = data.conversion_rates[fromCurrency.value];
            let toCur = data.conversion_rates[toCurrency.value];

            let result = ((amountInput.value * toCur) / fromCur).toFixed(2);

            ResultAmount.innerHTML = `${amountInput.value} ${fromCurrency.value} = ${result} ${toCurrency.value}`
        }
    })
    
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
    }
}

getData();


