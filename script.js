document.getElementById('start-button').addEventListener('click', startQuiz);

let questions = [
        {
            question: "What will the code below output to the console: console.log(1 + +'2' + '3');",
            options: ['123', '33', '15', '6'],
            answer: '123'
        },
        {
            question: "What data type is NaN?",
            options: ['Number', 'String', 'Object', 'Null'],
            answer: 'Number'
        },
        {
            question: "Which method removes the last element from an array and returns that element?",
            options: ['pop()', 'push()', 'shift()', 'unshift()'],
            answer: 'pop()'
        },
        {
            question: "What does the '===' operator checks?",
            options: ['Value and Data type', 'Only Value', 'If variable is undefined', 'None of the above'],
            answer: 'Value and Data type'
        },
        {
            question: "What will the following code output? console.log(typeof typeof 1);",
            options: ['number', 'string', 'boolean', 'undefined'],
            answer: 'string'
        },
        {
            question: "What is the output of this expression: '2' + 2",
            options: ['22', '4', 'error', 'none of the above'],
            answer: '22'
        },
        {
            question: "How do you write an IF statement in JavaScript?",
            options: ['if i = 5 then', 'if i = 5', 'if (i == 5)', 'if i == 5 then'],
            answer: 'if (i == 5)'
        },
        {
            question: "What is the JavaScript syntax for printing values in Console?",
            options: ['print(5)', 'console.log(5);', 'console.print(5);', 'print.console(5);'],
            answer: 'console.log(5);'
        },
        {
            question: "Which type of JavaScript language is ___ ? - Object-based",
            options: ['Server side scripting', 'Client side scripting', 'Both', 'None of the above'],
            answer: 'Both'
        },
        {
            question: "What will the following code output? console.log('5' + 3);",
            options: ['8', '53', 'undefined', 'error'],
            answer: '53'
        },
];

let currentQuestion = 0;
let score = 0;
let timer = 60;

function startQuiz() {
    document.getElementById('quiz-container').innerHTML = `
        <h1>JavaScript Quiz</h1>
        <p id="timer">Time: ${timer} seconds</p>
        <h2>${questions[currentQuestion].question}</h2>
        <button class="option-button">${questions[currentQuestion].options[0]}</button>
        <button class="option-button">${questions[currentQuestion].options[1]}</button>
        <button class="option-button">${questions[currentQuestion].options[2]}</button>
        <button class="option-button">${questions[currentQuestion].options[3]}</button>
        <p id="feedback"></p>
    `;

    document.querySelectorAll('.option-button').forEach(option => {
        option.addEventListener('click', selectOption);
    });

    setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer--;
    document.getElementById('timer').textContent = `Time: ${timer} seconds`;

    if (timer <= 0) {
        endQuiz();
    }
}

function selectOption(e) {
    if (e.target.textContent === questions[currentQuestion].answer) {
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        document.getElementById('feedback').textContent = 'Incorrect!';
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextQuestion();
    } else {
        endQuiz();
    }
}

function nextQuestion() {
    document.getElementById('quiz-container').innerHTML = `
        <h1>JavaScript Quiz</h1>
        <p id="timer">Time: ${timer} seconds</p>
        <h2>${questions[currentQuestion].question}</h2>
        <button class="option-button">${questions[currentQuestion].options[0]}</button>
        <button class="option-button">${questions[currentQuestion].options[1]}</button>
        <button class="option-button">${questions[currentQuestion].options[2]}</button>
        <button class="option-button">${questions[currentQuestion].options[3]}</button>
        <p id="feedback"></p>
    `;

    document.querySelectorAll('.option-button').forEach(option => {
        option.addEventListener('click', selectOption);
    });
}

function endQuiz() {
    clearInterval(updateTimer);
    document.getElementById('quiz-container').innerHTML = `
        <h1>Quiz Finished!</h1>
        <p>Your score is: ${score} out of ${questions.length}</p>
        <p>Your time remaining is: ${timer} seconds</p>
        <input id="initials" type="text" placeholder="Enter your initials">
        <button id="save-score">Save Score</button>
        <button id="go-back">Go Back</button>
    `;

    document.getElementById('save-score').addEventListener('click', saveScore);
    document.getElementById('go-back').addEventListener('click', goBack);
}

function saveScore() {
    let initials = document.getElementById('initials').value;
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let newScore = {
        initials: initials,
        score: score,
        time: timer
    };

    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
}