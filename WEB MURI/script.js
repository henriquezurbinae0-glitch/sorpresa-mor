function abrirHistoria() {

    const historia = document.getElementById("historia");

    historia.classList.remove("oculto");

    historia.classList.add("aparecer");

    setTimeout(() => {

        historia.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);

}


function abrirCarta() {

    const carta = document.getElementById("carta");

    carta.classList.remove("oculto");

    carta.classList.add("aparecer");

    setTimeout(() => {

        carta.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);

}