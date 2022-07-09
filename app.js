const boxes = document.querySelectorAll(".grid-box");
const checkButton = document.querySelector(".key-check");
const grid = document.querySelector(".grid");
const gameboard = [];

for(let i = 6; i > 0; --i){
    const row = [];
    gameboard.push(row);
    for(let i = 5; i > 0; --i){
        const gridBox = document.createElement("div");
        gridBox.classList.add("grid-box");
        row.push(gridBox);
    };
};

for(let row of gameboard){
    for(let box of row){
        grid.appendChild(box);
    }
};

const generatedWord = "парта";
const hashMap = {};
    const arr = generatedWord.split("");
    for(let i in arr){
        hashMap[arr[i]] = true;
    };

let userWord = "";
let attempt = 0;
let position = 0;
document.querySelector(".keyboard").addEventListener("click", (e)=>{
    if(e.target.classList.contains("key") && userWord.length !== 5){
        userWord += e.target.innerText;
        gameboard[attempt][position].innerText = e.target.innerText;
        position += 1;
    };
});

checkButton.addEventListener("click", ()=>{
    if(userWord.length === 5) {
        if(userWord.toLowerCase() === generatedWord){
            console.log("Слово угадано", attempt+1);
            for(let box of gameboard[attempt]){
                box.classList.add("green");
            }
            checkButton.setAttribute("disabled", true);
        } else {
            for(let i = 0; i < userWord.length; ++i){
                if(userWord.toLowerCase()[i] === generatedWord[i]){
                    gameboard[attempt][i].classList.add("green");
                } else if(hashMap[userWord.toLowerCase()[i]]){
                    gameboard[attempt][i].classList.add("yellow");
                } else {
                    gameboard[attempt][i].classList.add("gray");
                }
            }
            attempt += 1;
            userWord = "";
            position = 0;
        }
    }
});

document.querySelector(".key-large").addEventListener("click", (e) => {
    userWord = userWord.split("").splice(0, userWord.length - 1).join("");
    gameboard[attempt][position-1].innerText = "";
    if(position > 0) {
        position -= 1;
    }
    console.log(userWord);
})

