const questions = [
    {
        question:"What country has the most islands in the world?",
        answers: [
            {text: "India", correct: false},
            {text: "Australia", correct: false},
            {text: "Sweden", correct: true},
            {text: "Soudi arabia", correct: false},
        ]
    },
    {
        question:"When was Netflix founded?",
        answers: [
            {text: "1997", correct: true},
            {text: "2001", correct: false},
            {text: "1994", correct: false},
            {text: "2003", correct: false},

        ] 
    },
    {
        question:"Which Korean series on Netflix became a global phenomenon in 2021??",
        answers: [
            {text: "Vincenzo", correct: false},
            {text: "Squid Game", correct: true},
            {text: "Death's Game", correct: false},
            {text: "All of Us Are Dead", correct: false},

        ]   
    },
    {
        question:"How much time csk won ipl?",
        answers: [
            {text: "5", correct: true},
            {text: "4", correct: false},
            {text: "6", correct: false},
            {text: "7", correct: false},

        ] 
    },
    {
        question:"For which movie did actor Suriya get more number of awards from various associations??",
        answers: [
            {text: "7aum Arivu", correct: false},
            {text: "Vaaranam Aayiram", correct: true},
            {text: "Mounam Pesiyadhe", correct: false},
            {text: "Thaanaa Serndha Koottam", correct: false},

        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question ;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    })
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
}else{
    showScore();
}
}


nextButton.addEventListener("click",()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz()