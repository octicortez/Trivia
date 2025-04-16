# Juego de Trivia🕹️

Este proyecto es un juego de trivia desarrollado en HTML, CSS y JavaScript y React. En este utilizamos la API de [Open Trivia DB](https://opentdb.com/) para obtener preguntas de diferentes categorías y niveles de dificultad.


# ¿Qué hace este juego?

El juego permite que el usuario pueda:
- Seleccionar una categoría y una dificultad.
- Responder 5 preguntas de opción múltiple.
- Ver su puntaje en tiempo real.
- Obtener una pantalla final con el resultado total.
- Elegir entre `reiniciar el juego` o `volver al menú principal`.


##  Archivos del proyecto

- `index.html` → Estructura HTML de la app.
- `style.css` → Estilos visuales de la app.
- `script.js` → Lógica del juego, manejo de API y control de pantallas.
- `react.jsx` → combina los codigos trbajados en htmml y java script.


# ¿Cómo usarlo?

# 1. Clonar este repositorio
bash 
git clone https://github.com/octicortez/Trivia.git


# 2. Abrír el archivo `index.html` en tu navegador


# Instrucciones de funcionamiento de la app

1. # Pantalla de inicio (`pantalla-principal`):
   - El usuario elige una categoría (cargada dinámicamente desde la API).
   - Elige la dificultad: fácil, media o difícil.
   - Presiona la opcion `¡Jugar!` para empezar.

2. # Carga de preguntas:
   - Se hace una llamada a la API con las opciones de juego seleccionadas.
   - Se reciben 5 preguntas de tipo `multiple choice` sobre la tematica y dificultad seleccionada.

3. # Pantalla de juego (`pantalla-juego`):
   - Se muestra una pregunta a la vez con 4 opciones (una correcta, tres incorrectas).
   - Al seleccionar una opción:
     - Se deshabilitan los botones.
     - Se colorea la correcta (verde) y la incorrecta (rojo, si aplica).
     - Se actualiza el puntaje si fue correcta.

4. # Pantalla final (`pantalla-final`):
   - Muestra el puntaje total obtenido.
   - Ofrece opciones para `reiniciar` (comienza una nueva trivia) o `volver al menú` (pantalla inicial).


# Lenguajes utilizados:

- # HTML para la estructura básica.
- # CSS para estilos 
- # JavaScript para toda la lógica.


# Fuente de datos

- React, para conectar los distinors codigos y permitir hacer la intefaz de usuario
- [Open Trivia Database](https://opentdb.com/)
- Permite obtener preguntas clasificadas por categorías, dificultad y tipo.


# Mejora futura

- Agregar mejores estilos visuales y modernos en `style.css`.
- Desarrollar la app con React native.