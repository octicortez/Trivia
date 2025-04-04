const questionElement = document.getElementById("question");
const buttons = document.querySelectorAll(".answer");
const resultado = document.getElementById("resultado");

const questions = [
    {
        question: "¿Cuál es la capital de Argentina?",
        options: ["Buenos Aires", "Lima", "Santiago", "Bogotá"],
        answer: "Buenos Aires"
    }
];

function loadQuestion() {
    const q = questions[0];
    questionElement.textContent = q.question;
    resultado.textContent = "";

    buttons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.className = "answer"; // Limpiar clases previas
        btn.disabled = false;

        btn.onclick = () => {
            buttons.forEach(b => b.disabled = true); // Desactivar todo

            if (btn.textContent === q.answer) {
                btn.classList.add("correct");
                resultado.textContent = "¡Correcto!";
            } else {
                btn.classList.add("incorrect");
                resultado.textContent = "Incorrecto. La respuesta correcta era: " + q.answer;

                buttons.forEach(b => {
                    if (b.textContent === q.answer) {
                        b.classList.add("correct");
                    }
                });
            }
        };
    });
}

loadQuestion();
