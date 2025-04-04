const questionElement = document.getElementById("question");
const buttons = document.querySelectorAll(".answer");

const questions = [
    { question: "¿Cuál es la capital de Argentina?", options: ["Buenos Aires", "Lima", "Santiago", "Bogotá"], answer: "Buenos Aires" }
];

function loadQuestion() {
    let q = questions[0];
    questionElement.textContent = q.question;
    buttons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.onclick = () => checkAnswer(q.options[index], q.answer);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) alert("¡Correcto!");
    else alert("Incorrecto. Inténtalo de nuevo.");
}

loadQuestion();