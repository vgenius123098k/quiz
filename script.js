const quizzes = [
    {
        id: 1,
        name: "Общая викторина",
        questions: [
            { q: "Сколько месяцев в году имеют 28 дней?", answers: ["1", "6", "12", "Все"], correct: "12" },
            { q: "Столица Франции?", answers: ["Берлин", "Лондон", "Париж", "Рим"], correct: "Париж" }
        ]
    }
];

let currentQuiz = null;
let currentQuestionIndex = 0;
const app = document.getElementById('app');

function showStart() {
    let options = quizzes.map(q => `<option value="${q.id}">${q.name}</option>`).join('');
    app.innerHTML = `
        <div class="title"><h2>Выберите викторину:</h2></div>
        <div class="vibor">
            <select id="quiz-select">${options}</select>
            <p><button class="btn" onclick="startQuiz()">Выбрать</button></p>
        </div>`;
}

function startQuiz() {
    const id = document.getElementById('quiz-select').value;
    currentQuiz = quizzes.find(q => q.id == id);
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    let answersHtml = question.answers.map((ans, i) => `
        <div class="form_radio_btn">
            <input type="radio" id="ans_${i}" name="ans_text" value="${ans}">
            <label for="ans_${i}">${ans}</label>
        </div>`).join('');

    app.innerHTML = `
        <div class="title"><h1>${question.q}</h1></div>
        <div class="vibor">
            ${answersHtml}
            <p><button class="btn" onclick="nextQuestion()">Ответить</button></p>
        </div>`;
}

function nextQuestion() {
    const selected = document.querySelector('input[name="ans_text"]:checked');
    if (!selected) return alert("Выберите вариант!");
    
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
        showQuestion();
    } else {
        app.innerHTML = `<div class="title"><h1>Тест окончен!</h1></div>
                         <div class="vibor"><button class="btn" onclick="showStart()">В начало</button></div>`;
    }
}

showStart();
