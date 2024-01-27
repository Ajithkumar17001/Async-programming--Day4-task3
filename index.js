let cuntbox = document.querySelectorAll(".currency");
let btn = document.querySelector("button");
let inputbox = document.getElementById("input-1");
let result = document.getElementById("input-2");
let form = document.querySelector("form");

fetch("https://api.frankfurter.app/currencies")
    .then((res) => res.json())
    .then((res) => country(res));

function country(res) {
    let contries = Object.entries(res);
    for (let i = 0; i < contries.length; i++) {
        let opt = `<option value="${contries[i][0]}">${contries[i][0]}</option>`;
        cuntbox[0].innerHTML += opt;
        cuntbox[1].innerHTML += opt;
    }
}

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let box1 = cuntbox[0].value;
    let box2 = cuntbox[1].value;
    let inpval = inputbox.value;

    if (box1 === box2) {
        alert("Choose another currency");
    } else {
        convert(box1, box2, inpval);
    }
});

function convert(box1, box2, inpval) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${inpval}&from=${box1}&to=${box2}`)
        .then((resp) => resp.json())
        .then((data) => {
            result.value = Object.values(data.rates)[0];
        });
}