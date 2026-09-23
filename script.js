let temporizador = null;
let inicio = null;
let manteniendo = false;

const boton = document.getElementById("boton-corazon");
const progreso = document.getElementById("progreso");

const DURACION = 2000; // 2 segundos

function iniciarCarga(e) {
if (manteniendo) return;


e.preventDefault();
manteniendo = true;
inicio = Date.now();

progreso.style.width = "0%";

function actualizar() {
    if (!manteniendo) return;

    const transcurrido = Date.now() - inicio;
    const porcentaje = Math.min((transcurrido / DURACION) * 100, 100);

    progreso.style.width = porcentaje + "%";

    if (porcentaje >= 100) {
        manteniendo = false;
        progreso.style.width = "100%";
        abrirHistoria();
        return;
    }

    requestAnimationFrame(actualizar);
}

requestAnimationFrame(actualizar);
```

}

function cancelarCarga() {
if (!manteniendo) return;

```
manteniendo = false;
progreso.style.width = "0%";
```

}

boton.addEventListener("pointerdown", iniciarCarga);
boton.addEventListener("pointerup", cancelarCarga);
boton.addEventListener("pointercancel", cancelarCarga);
boton.addEventListener("pointerleave", cancelarCarga);

function abrirHistoria() {
const historia = document.getElementById("historia");

```
if (!historia) return;

historia.classList.remove("oculto");
historia.classList.add("aparecer");

setTimeout(function () {
    historia.scrollIntoView({
        behavior: "smooth"
    });
}, 100);
```

}

function abrirCarta() {
const carta = document.getElementById("carta");

```
if (!carta) return;

carta.classList.remove("oculto");
carta.classList.add("aparecer");

setTimeout(function () {
    carta.scrollIntoView({
        behavior: "smooth"
    });
}, 100);


}
