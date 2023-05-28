document.getElementById('start-button').addEventListener('click', startQuiz);

let questions = [
    {
        question: "What will the code below output to the console: console.log(1 + +'2' + '3');",
        options: ['123', '33', '15', '6'],
        answer: '123'
    }
    // Add more questions here...
];

let currentQuestion = 0;
let score = 0;
let timer = 60;