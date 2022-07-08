console.log("Hello");
const boxes = document.querySelectorAll(".grid-box");
const boxesArr = [];
boxes.forEach(el => boxesArr.push(el));
console.log(boxes);

const generatedWord = "парта";

let userWord = "";
let boxPosition = 0;
document.querySelector(".keyboard").addEventListener("click", (e)=>{
    if(e.target.classList.contains("key")){
        if(userWord.length !== 5){
            boxPosition += 1; 
            userWord += e.target.innerText;
            console.log(boxPosition % 5);
            boxes[boxPosition-1].innerText = e.target.innerText;
        }
    };
});

document.querySelector(".key-check").addEventListener("click", ()=>{
    const hashMap = {};
    const arr = generatedWord.split("");
    for(let i in arr){
        hashMap[arr[i]] = i;
    };

    if(userWord.length === 5){
        for(let i = 0; i < userWord.length; ++i){
            if(userWord[i].toLowerCase() === generatedWord[i].toLowerCase()){
                boxes[i].classList.add("green");
            } else if(hashMap[userWord.toLowerCase()[i]]){
                boxes[i].classList.add("yellow");
            }
        }
    }
});

