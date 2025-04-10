import React, { useEffect, useState } from 'react';
import './App.css';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export default function App() {
  const [pantalla, setPantalla] = useState('principal');
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [dificultad, setDificultad] = useState('easy');
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategorias(data.trivia_categories));
  }, []);

  const jugar = async () => {
    const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoria}&difficulty=${dificultad}&type=multiple`);
    const data = await res.json();
    setPreguntas(data.results);
    setPreguntaActual(0);
    setPuntaje(0);
    setPantalla('juego');
  };

  const verificarRespuesta = (i, indiceCorrecta) => {
    const opciones = [...preguntas[preguntaActual].incorrect_answers];
    const correcta = preguntas[preguntaActual].correct_answer;
    opciones.splice(indiceCorrecta, 0, correcta);
    const seleccionada = opciones[i];

    if (seleccionada === correcta) setPuntaje(p => p + 10);

    setTimeout(() => {
      if (preguntaActual + 1 < preguntas.length) {
        setPreguntaActual(p => p + 1);
      } else {
        setPantalla('final');
      }
    }, 1500);
  };

  const reiniciar = () => {
    setPantalla('juego');
    setPreguntaActual(0);
    setPuntaje(0);
  };

  const salir = () => {
    setPantalla('principal');
  };

  const renderOpciones = () => {
    const actual = preguntas[preguntaActual];
    const opciones = [...actual.incorrect_answers];
    const indiceCorrecta = Math.floor(Math.random() * 4);
    opciones.splice(indiceCorrecta, 0, actual.correct_answer);

    return opciones.map((op, i) => (
      <button key={i} className="respuesta" onClick={() => verificarRespuesta(i, indiceCorrecta)}>
        {decodeHTML(op)}
      </button>
    ));
  };

  const total = preguntas.length * 10;

  return (
    <div className="App">
      {pantalla === 'principal' && (
        <div>
          <h1>Juego de Trivia</h1>
          <label>Temática:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Cargando categorías...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <label>Dificultad:</label>
          <select value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
            <option value="easy">Fácil</option>
            <option value="medium">Media</option>
            <option value="hard">Difícil</option>
          </select>

          <button onClick={jugar}>¡Jugar!</button>
        </div>
      )}

      {pantalla === 'juego' && (
        <div>
          <h2>{decodeHTML(preguntas[preguntaActual].question)}</h2>
          <div id="opciones">{renderOpciones()}</div>
          <h4>Puntaje: {puntaje} / {total}</h4>
        </div>
      )}

      {pantalla === 'final' && (
        <div>
          <h2>¡Trivia Finalizada!</h2>
          <p>Tu puntaje final es: {puntaje} / {total}</p>
          <button onClick={reiniciar}>Reiniciar</button>
          <button onClick={salir}>Salir</button>
        </div>
      )}
    </div>
  );
}
