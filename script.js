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