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

const generatedWord = words[Math.floor(Math.random()*words.length)];
console.log(generatedWord);
const hashMap = {};
const arr = generatedWord.split("");
for(let i in arr){
    hashMap[arr[i]] = true;
};

let userWord = "";
let attempt = 0;
let position = 0;
let isGameOver = false;
document.querySelector(".keyboard").addEventListener("click", (e)=>{
    if(e.target.classList.contains("key") && userWord.length !== 5 && attempt <= 5 && !isGameOver){
        userWord += e.target.innerText;
        gameboard[attempt][position].innerText = e.target.innerText;
        position += 1;
    };
});

checkButton.addEventListener("click", ()=>{
    if(userWord.length === 5 && attempt <= 5) {
        checkWord(userWord.toLowerCase(), generatedWord);    
        attempt += 1;
        userWord = "";
        position = 0;
    } 
});

function checkWord(userWord, generatedWord){
    markLetters(userWord, generatedWord);
    if(userWord === generatedWord && attempt <= 5){
        console.log("Слово угадано", attempt+1);
        isGameOver = true;
    } else if(userWord !== generatedWord && attempt === 5){
        console.log("Игра окончена");
        isGameOver = true;
    }
};

function markLetters(userWord, generatedWord){
    for(let i = 0; i < userWord.length; ++i){
        if(userWord[i] === generatedWord[i]){
            gameboard[attempt][i].classList.add("green");
        } else if(hashMap[userWord[i]]){
            gameboard[attempt][i].classList.add("yellow");
        } else {
            gameboard[attempt][i].classList.add("gray");
        }
    }
}

document.querySelector(".key-large").addEventListener("click", (e) => {
    userWord = userWord.split("").splice(0, userWord.length - 1).join("");
    gameboard[attempt][position-1].innerText = "";
    if(position > 0) {
        position -= 1;
    }
    console.log(userWord);
})

