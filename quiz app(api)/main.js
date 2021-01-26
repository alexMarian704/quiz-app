const APIQUIZ = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
const LOCALAPI = "./quiz.json";
const TESTAPI = "https://jsonplaceholder.typicode.com/photos";

const container = document.getElementById("container");
const nextQuiz = document.getElementById("nextQuiz");
const score = document.getElementById("score");
let toggle = false;
let scoreNumber = 0;
let nr = 1;
let questionNumber = 1;
let oneClick= 0;

function getQuiz() {
    fetch(LOCALAPI)
        .then((res) => res.json())
        .then((date) => {
            console.log(date);
            nextQuiz.addEventListener('click', function nextQ() {
                toggle = true;
                if (toggle == true) { nextQuiz.innerText = "Next Question"; }
                if (toggle == true && nr == 1) score.innerHTML = `Your score is 0`;
                date.results.map((quiz) => {
                    if (quiz.id === nr && nr <= quiz.id+1) {
                        const quizAnswer = [...quiz.incorrect_answers];
                        const corect = [...quiz.correct_answer];
                        let arrayNumber = [0, 1, 2, 3];
                        let randomNumber = [0, 0, 0, 0]; 
                        for (i = 0; i <= 3; i++) {
                            let random = Math.floor(Math.random() * arrayNumber.length);
                            randomNumber[i] = arrayNumber[random];
                            arrayNumber = arrayNumber.filter(item => item !== arrayNumber[random]);
                        }
                        displayRadioValue(corect);
                        container.innerHTML = `
                <div id ="quizContainer"></div>
                    <h1 id="qustionNumber">Question Number ${questionNumber}</h1>
                    <h2 id="quizTitle">${quiz.question}</h2>
                    <li id="questions">
                    <input type="radio" id="a" name="options" id="questionInput" class="${quizAnswer[randomNumber[1]]}"/>
                    <label for="a" id="text" for="a" name="inputText">${quizAnswer[randomNumber[1]]}</label>
                    </li>
                    <li id="questions">
                    <input type="radio" id="b" name="options" id="questionInput" class="${quizAnswer[randomNumber[0]]}"/>
                    <label for="b" id="text" for="b"name="inputText">${quizAnswer[randomNumber[0]]}</label>
                    </li>
                    <li id="questions">
                    <input type="radio" id="c" name="options" id="questionInput" class="${quizAnswer[randomNumber[2]]}"/>
                    <label for="c" id="text" for="c" name="inputText">${quizAnswer[randomNumber[2]]}</label>
                    </li>
                    <li id="questions">
                    <input type="radio" id="d" name="options" id="questionInput" class="${quizAnswer[randomNumber[3]]}"/>
                    <label for="d" id="text" for="d" name="inputText">${quizAnswer[randomNumber[3]]}</label>
                    </li>
                </div>    
                      `;
                    }
                    if (nr > questionNumber) {
                        container.innerHTML = `<h1 id="final">Your score is ${scoreNumber}/${questionNumber}</h1>`
                        score.innerHTML = "";
                        nextQuiz.innerText="Reset";
                        toggle = false;
                        scoreNumber = 0;
                        nr = 1;
                        questionNumber = 1;
                        oneClick = 0;
                    }
                })
            })
        })
}

function displayRadioValue(quiz) {
    const input = document.getElementsByName('options');
    const inputValue = document.getElementsByName("inputText");

    for (i = 0; i < input.length; i++) {
        if (input[i].checked) { 
            nr++;
            if (questionNumber < 10) {questionNumber++;}
            const inputClassArray = [...input[i].className];
            if (inputClassArray[0] === quiz[0]) {
                scoreNumber++
            }
            score.innerHTML = `Your score is ${scoreNumber}/${questionNumber}`;
        }
    }
}
getQuiz();
