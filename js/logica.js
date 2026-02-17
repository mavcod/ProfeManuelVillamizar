let aciertos = 0;
let tiempoRestante = 300; // 5 minutos
let currentIndex = 0;
let timer;
let preguntas = [];

function iniciarPrueba(preguntasArray) {
    preguntas = preguntasArray;
    aciertos = 0;
    tiempoRestante = 300;
    document.getElementById("aciertosContador").innerText = `Aciertos: ${aciertos} / 20`;
    document.getElementById("mensaje").innerText = "";
    siguientePregunta();
    clearInterval(timer);
    timer = setInterval(actualizarReloj, 1000);
}

function actualizarReloj() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    document.getElementById("reloj").innerText =
        `${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
    tiempoRestante--;
    if (tiempoRestante < 0) {
        clearInterval(timer);
        alert("Se acabó el tiempo. Inicia nuevamente la prueba.");
        iniciarPrueba(preguntas);
    }
}

function siguientePregunta() {
    currentIndex = Math.floor(Math.random() * preguntas.length);
    document.getElementById("pregunta").innerText = preguntas[currentIndex].pregunta;
    document.getElementById("respuesta").value = "";
    document.getElementById("respuesta").focus();
}

function validarRespuesta() {
    const respuestaUsuario = document.getElementById("respuesta").value.trim();
    const respuestaCorrecta = preguntas[currentIndex].respuesta;

    if (Number(respuestaUsuario) === Number(respuestaCorrecta)) {
        aciertos++;
        document.getElementById("mensaje").style.color = "green";
        document.getElementById("mensaje").innerText = "¡Correcto!";
        document.getElementById("aciertosContador").innerText = `Aciertos: ${aciertos} / 20`;
        if (aciertos >= 20) {
            clearInterval(timer);
            alert(`¡Felicidades ${document.getElementById("nombre").value || ""}! Pasaste la prueba.`);
            iniciarPrueba(preguntas);
        } else {
            siguientePregunta();
        }
    } else {
        document.getElementById("mensaje").style.color = "red";
        document.getElementById("mensaje").innerText = "Respuesta incorrecta";
        siguientePregunta();
    }
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnValidar")?.addEventListener("click", validarRespuesta);
    document.getElementById("respuesta")?.addEventListener("keydown", function(e) {
        if (e.key === "Enter") validarRespuesta();
    });
});
