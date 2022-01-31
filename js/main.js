import { shuffle } from "./utils";

let numeroAleatorio;
let contadorJugador = 0;
let contadorCPU = 0;

const numerosBombo = new Array(90)
        .fill(0)
        .map((x, i) => i + 1);

const bolasCarton1 = shuffle(numerosBombo).slice(0, 15);
const bolasCarton2 = shuffle(numerosBombo).slice(0, 15);

// Rellenar cartones jugadores
for(let i = 0; i < bolasCarton1.length; i++){
    let bola = document.createElement("div");
    bola.className = "bola bola" + bolasCarton1 [i];               
    bola.innerText = bolasCarton1 [i];
    
    document.getElementById("carton1").appendChild(bola);
}

for(let i = 0; i < bolasCarton2.length; i++){
    let bola = document.createElement("div");
    bola.className = "bola bola" + bolasCarton2 [i];               
    bola.innerText = bolasCarton2 [i];
    
    document.getElementById("carton2").appendChild(bola);
}

function sacarNumeroDelBombo() {
    
    shuffle(numerosBombo);

    numeroAleatorio = numerosBombo.shift();

    bolaBombo.innerHTML = numeroAleatorio;
    console.log(numeroAleatorio)

    const recuadro = document.createElement("div");
    recuadro.innerHTML += ` ${numeroAleatorio}`;
    recuadro.className = "estiloRecuadro";
    document.getElementById("historico").appendChild(recuadro);

    tacharNumero();
}

const sacar = document.getElementById("sacar");

sacar.addEventListener("click", function() {
    sacarNumeroDelBombo("bolaBombo");
});

function tacharNumero() {
    let eliminar = document.querySelectorAll(".bola" + numeroAleatorio);
    eliminar.forEach(element => {
       element.classList.add("tachar"); 
    });
    // Contar las bolas acertadas
    for(let i = 0; i <= 15; i++){  
        
        if(bolasCarton1[i] === numeroAleatorio) {     
            contadorJugador++;
            comprobarGanador(contadorJugador, "¡¡Has ganado!!");
        }
    
        if(bolasCarton2[i] === numeroAleatorio) {
            contadorCPU++;
            comprobarGanador(contadorCPU, "Ohhh, has perdido.");
        }     
    }
}

function comprobarGanador(contador, mensaje) {
    if(contador === 15) {

        const cartel = document.createElement("div");
        cartel.innerHTML = mensaje;
        document.getElementById("espacio").appendChild(cartel);

        sacar.remove();
    }
}