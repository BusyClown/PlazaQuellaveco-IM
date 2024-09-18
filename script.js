const questions = [
    {
        question: '¿Cómo se le conoce al equipo de Gestión de la Información?',
        answers: [
            { text: 'IM', correct: true },
            { text: 'IS', correct: false },
            { text: 'ORM', correct: false }
        ]
    },
    {
        question: '¿Cómo se maximiza la recuperación de cobre en la flotación?',
        answers: [
            { text: 'Con Controles Avanzados de Procesos (APC)', correct: true },
            { text: 'Usando más agua', correct: false },
            { text: 'Aumentando la velocidad de los molinos', correct: false },
        ]
    },
    {
        question: '¿Para qué se utilizará el Gemelo Digital de mina?',
        answers: [
            { text: 'Mejorar en tiempo real los resultados del proceso de minado', correct: true },
            { text: 'Supervisar a los colaboradores', correct: false },
            { text: 'Monitorear nuestras instalaciones', correct: false }
        ]
    },
    {
        question: '¿Qué tecnología se usa en Recuperación de Flotación?',
        answers: [
            { text: 'IA de Machine Learning', correct: true },
            { text: 'Sistema ADAS', correct: false },
            { text: 'ARN mensajero', correct: false }
        ]
    }
];

const startButton          = document.getElementById('start-btn');
const questionContainer    = document.getElementById('question-container');
const questionElement      = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement         = document.getElementById('score');
const nextButton           = document.getElementById('next-btn');
const rptButton            = document.getElementById('rpt-btn');
const resetButton          = document.getElementById('reset-btn');
const msgScore             = document.getElementById("msg-score");


let shuffledQuestions;
let currentQuestionIndex;
let score;
let rptCorrect = false;

document.addEventListener(
    "DOMContentLoaded", function() {
        showScreen(1);
    }
);

startButton.addEventListener(
    "click", function() {
        showScreen(2);
        startGame();

    }
);

nextButton.addEventListener(
    "click", function() {
        if (rptCorrect) {
            score++;
            rptCorrect = false;
        }

        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            showScreen(3);
            endGame();  
            if (score == 0) {
                msgCongratulation("Intentalo otra vez");
            } else if (score > 0 && score < 4) {
                msgCongratulation("Puedes mejorar");
            } else if (score == 4) {
                msgCongratulation("¡LO LOGRASTE!")
            }
        } 
    }
)

rptButton.addEventListener(
    "click", function() {
        showScreen(4);
    }
)

resetButton.addEventListener(
    "click", function() {
        location.reload();
    }
)

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    hiddenNextBtn();
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    myAnim ();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.sort(() => Math.random() - 0.5).forEach(
        answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
        
            answerButtonsElement.appendChild(button);
        }
    );
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    stylesDefault()
    this.style.backgroundColor = "aquamarine";
    if (correct) {
        rptCorrect = true;
    } else {
        rptCorrect = false;
    }
    showNextBtn();
}

function endGame() {
    scoreElement.innerText = score;
}

function hiddenNextBtn() {
    document.querySelectorAll('.next-btn').forEach(
        function(elemento) {
            elemento.style.display = 'none';
        }
    );
}

function showNextBtn() {
    document.getElementById('next-btn').style.display = 'block';
}

function myAnim() {
    const elemento = document.getElementById("app");
    elemento.classList.remove("app");setTimeout(() => {
        elemento.classList.add("app");
    }, 0);
}

function stylesDefault() {
    const botones = document.querySelectorAll('.btn');
    botones.forEach(boton => {
        boton.style.backgroundColor = "white";
    });
}

function msgCongratulation (myMessage) {
    msgScore.innerText = myMessage;
}

// function PantallaCompleta () {
    
//     const elem = document.documentElement;


//     if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) { // Firefox
//         elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) { // Chrome, Safari y Opera
//         elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) { // Internet Explorer/Edge
//         elem.msRequestFullscreen();
//     }
// }