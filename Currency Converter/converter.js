let Base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns=document.querySelectorAll('.dropdown select');
const convertBtn=document.querySelector('button');
let fromSelect=document.querySelector('#from');
let toSelect=document.querySelector('#to');
let msg=document.querySelector('.msg p');

async function conversion(){
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<=0){
        amount.value=1;
        amtVal=1;
    }
    let fromCurrCode=fromSelect.value;
    let toCurrCode=toSelect.value;
    let newUrl=`${Base_Url}${fromCurrCode.toLowerCase()}.json`;
    let response=await fetch(newUrl);
    let data=await response.json();
    let rate=data[`${fromCurrCode.toLowerCase()}`][`${toCurrCode.toLowerCase()}`];
    msg.innerText=`${amtVal} ${fromCurrCode} = ${rate*amtVal} ${toCurrCode}`;
}


for(let select of dropdowns) {
    for(let currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerHTML = currCode;
        select.append(newOption);
        if(select.name=='from' && currCode=='USD'){
            newOption.selected=true;
        } else if(select.name=='to' && currCode=='INR'){
            newOption.selected=true;
        }
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg= element.parentElement.querySelector('img');
    newImg.src=newSrc;
}

window.addEventListener('load',conversion);
convertBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    conversion();
}
);