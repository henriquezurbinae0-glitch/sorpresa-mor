/* ========================= */
/* CORAZÓN INICIAL */
/* ========================= */

let inicio = null;
let manteniendo = false;

const boton =
    document.getElementById("boton-corazon");

const progreso =
    document.getElementById("progreso");

const porcentajeTexto =
    document.getElementById("porcentaje");

const instruccion =
    document.getElementById("instruccion-corazon");


/* ========================= */
/* MÚSICA */
/* ========================= */

const musica =
    document.getElementById("musica");

const botonMusica =
    document.getElementById("boton-musica");


const DURACION = 2000;


/* ========================= */
/* INICIAR CARGA */
/* ========================= */

function iniciarCarga(e) {

    if (manteniendo) return;

    e.preventDefault();

    manteniendo = true;

    inicio = Date.now();

    boton.classList.add(
        "manteniendo"
    );

    instruccion.textContent =
        "Sigue presionando...";

    instruccion.classList.add(
        "manteniendo"
    );


    function actualizar() {

        if (!manteniendo) return;


        const transcurrido =
            Date.now() - inicio;


        const numeroPorcentaje =
            Math.min(
                Math.floor(
                    (transcurrido / DURACION) * 100
                ),
                100
            );


        progreso.style.width =
            numeroPorcentaje + "%";


        porcentajeTexto.textContent =
            numeroPorcentaje + "%";


        if (numeroPorcentaje >= 100) {

            manteniendo = false;


            progreso.style.width =
                "100%";


            porcentajeTexto.textContent =
                "100%";


            boton.classList.remove(
                "manteniendo"
            );


            instruccion.textContent =
                "Preparando...";


            instruccion.classList.remove(
                "manteniendo"
            );


            /* ========================= */
            /* MOSTRAR AVISO DE MÚSICA */
            /* ========================= */

            const notificacionMusica =
                document.getElementById(
                    "notificacion-musica"
                );


            if (notificacionMusica) {

                notificacionMusica.classList.add(
                    "visible"
                );


                setTimeout(function() {

                    notificacionMusica.classList.remove(
                        "visible"
                    );

                }, 3000);

            }


            /* Iniciar música */

            iniciarMusica();


            /* Abrir historia */

            abrirHistoria();


            return;

        }


        requestAnimationFrame(
            actualizar
        );

    }


    requestAnimationFrame(
        actualizar
    );

}


/* ========================= */
/* CANCELAR CARGA */
/* ========================= */

function cancelarCarga() {

    if (!manteniendo) return;


    manteniendo = false;


    boton.classList.remove(
        "manteniendo"
    );


    progreso.style.width =
        "0%";


    porcentajeTexto.textContent =
        "0%";


    instruccion.textContent =
        "Mantén presionado...";


    instruccion.classList.remove(
        "manteniendo"
    );

}


/* ========================= */
/* EVENTOS DEL CORAZÓN */
/* ========================= */

boton.addEventListener(
    "pointerdown",
    iniciarCarga
);


boton.addEventListener(
    "pointerup",
    cancelarCarga
);


boton.addEventListener(
    "pointercancel",
    cancelarCarga
);


boton.addEventListener(
    "pointerleave",
    cancelarCarga
);


/* ========================= */
/* ABRIR HISTORIA */
/* ========================= */
/* Ahora cada sección (título, fotos, sobre, final) */
/* es independiente, así que se revelan todas juntas */
/* usando la clase compartida ".historia-parte"      */

function abrirHistoria() {

    const partes =
        document.querySelectorAll(
            ".historia-parte"
        );


    if (!partes.length) return;


    partes.forEach(function(parte) {

        parte.classList.remove(
            "oculto"
        );


        parte.classList.add(
            "aparecer"
        );

    });


    setTimeout(function() {

        const historia =
            document.getElementById(
                "historia"
            );


        if (historia) {

            historia.scrollIntoView({

                behavior: "smooth"

            });

        }

    }, 100);

}


/* ========================= */
/* CARRUSELES */
/* ========================= */

function configurarCarrusel(
    carruselId,
    puntosId
) {

    const carrusel =
        document.getElementById(
            carruselId
        );


    const puntos =
        document.getElementById(
            puntosId
        );


    if (!carrusel || !puntos) return;


    const slides =
        carrusel.querySelectorAll(
            ".foto-slide"
        );


    const indicadores =
        puntos.querySelectorAll(
            "span"
        );


    function actualizarActivo() {

        const ancho =
            carrusel.offsetWidth;


        if (!ancho) return;


        const indice =
            Math.round(
                carrusel.scrollLeft /
                ancho
            );


        indicadores.forEach(
            function(indicador, i) {

                indicador.classList.toggle(
                    "activo",
                    i === indice
                );

            }
        );


        slides.forEach(
            function(slide, i) {

                slide.classList.toggle(
                    "foto-activa",
                    i === indice
                );

            }
        );

    }


    carrusel.addEventListener(
        "scroll",
        actualizarActivo,
        {
            passive: true
        }
    );


    indicadores.forEach(
        function(indicador, indice) {

            indicador.addEventListener(
                "click",
                function() {

                    carrusel.scrollTo({

                        left:
                            indice *
                            carrusel.offsetWidth,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


    actualizarActivo();

}


/* ACTIVAR CARRUSELES */

configurarCarrusel(
    "carrusel1",
    "puntos1"
);


configurarCarrusel(
    "carrusel2",
    "puntos2"
);


/* ========================= */
/* ABRIR CARTA */
/* ========================= */

function abrirCarta() {

    const sobre =
        document.getElementById(
            "sobre"
        );


    const carta =
        document.getElementById(
            "carta"
        );


    const textoSobre =
        document.getElementById(
            "texto-sobre"
        );


    if (!sobre || !carta) return;


    if (
        sobre.classList.contains(
            "abierto"
        )
    ) {

        return;

    }


    /* Abrir sobre */

    sobre.classList.add(
        "abierto"
    );


    if (textoSobre) {

        textoSobre.textContent =
            "Abriendo...";

    }


    /* Esperar animación */

    setTimeout(function() {

        carta.classList.remove(
            "oculto"
        );


        carta.classList.add(
            "aparecer"
        );


        setTimeout(function() {

            carta.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 150);


    }, 650);

}


/* ========================= */
/* INICIAR MÚSICA */
/* ========================= */

function iniciarMusica() {

    if (!musica) return;


    /*
        Volumen inicial:
        35%
    */

    musica.volume = 0.35;


    musica.play()

        .then(function() {

            botonMusica.classList.add(
                "visible"
            );


            botonMusica.classList.add(
                "reproduciendo"
            );


            botonMusica.textContent =
                "♫";

        })


        .catch(function(error) {

            /*
                Algunos navegadores pueden
                bloquear la reproducción automática.
            */

            console.log(
                "El navegador bloqueó la reproducción automática.",
                error
            );


            botonMusica.classList.add(
                "visible"
            );

        });

}


/* ========================= */
/* BOTÓN DE MÚSICA */
/* ========================= */

botonMusica.addEventListener(
    "click",
    function() {


        if (musica.paused) {


            musica.play()

                .then(function() {

                    botonMusica.classList.add(
                        "reproduciendo"
                    );


                    botonMusica.textContent =
                        "♫";

                });


        } else {


            musica.pause();


            botonMusica.classList.remove(
                "reproduciendo"
            );


            botonMusica.textContent =
                "♪";

        }

    }
);
