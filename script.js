const pantallaPrincipal = document.getElementById('pantalla-principal');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaFinal = document.getElementById('pantalla-final');

const categoriaSelect = document.getElementById('categoria');
const dificultadSelect = document.getElementById('dificultad');
const jugarBtn = document.getElementById('jugar-btn');
const preguntaElem = document.getElementById('pregunta');
const opcionesElem = document.getElementById('opciones');
const puntajeFinalElem = document.getElementById('puntaje-final');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const salirBtn = document.getElementById('salir-btn');

let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;

// Cargar categorías desde API
fetch('https://opentdb.com/api_category.php')
  .then(res => res.json())
  .then(data => {
    data.trivia_categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      categoriaSelect.appendChild(opt);
    });
  });

jugarBtn.onclick = async () => {
  const categoria = categoriaSelect.value;
  const dificultad = dificultadSelect.value;

  const url = `https://opentdb.com/api.php?amount=5&category=${categoria}&difficulty=${dificultad}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();

  preguntas = data.results;
  preguntaActual = 0;
  puntaje = 0;

  pantallaPrincipal.classList.add('oculto');
  pantallaFinal.classList.add('oculto');
  pantallaJuego.classList.remove('oculto');

  mostrarPregunta();
};

function mostrarPregunta() {
  const actual = preguntas[preguntaActual];
  preguntaElem.innerHTML = decodeHTML(actual.question);

  const opciones = [...actual.incorrect_answers];
  const indiceCorrecta = Math.floor(Math.random() * 4);
  opciones.splice(indiceCorrecta, 0, actual.correct_answer);

  opcionesElem.innerHTML = '';
  opciones.forEach((opcion, i) => {
    const btn = document.createElement('button');
    btn.textContent = decodeHTML(opcion);
    btn.className = 'respuesta';
    btn.onclick = () => verificarRespuesta(btn, opcion === actual.correct_answer, indiceCorrecta);
    opcionesElem.appendChild(btn);
  });
}

function verificarRespuesta(boton, esCorrecta, indiceCorrecta) {
  const botones = document.querySelectorAll('.respuesta');

  botones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === indiceCorrecta) {
      btn.classList.add('correcta');
    }
    if (btn === boton && !esCorrecta) {
      btn.classList.add('incorrecta');
    }
  });

  if (esCorrecta) puntaje += 10;

  setTimeout(() => {
    preguntaActual++;
    if (preguntaActual >= preguntas.length) {
      mostrarPantallaFinal();
    } else {
      mostrarPregunta();
    }
  }, 1500);
}

function mostrarPantallaFinal() {
  pantallaJuego.classList.add('oculto');
  pantallaFinal.classList.remove('oculto');
  puntajeFinalElem.textContent = `Tu puntaje final es: ${puntaje} / ${preguntas.length * 10}`;
}

reiniciarBtn.onclick = () => {
  preguntaActual = 0;
  puntaje = 0;
  pantallaFinal.classList.add('oculto');
  pantallaJuego.classList.remove('oculto');
  mostrarPregunta();
};

salirBtn.onclick = () => {
  pantallaFinal.classList.add('oculto');
  pantallaPrincipal.classList.remove('oculto');
};

// Decodificar HTML entities como &quot; o &amp;
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}