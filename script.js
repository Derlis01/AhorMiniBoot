const divJuego = document.getElementById('game')
const divWelcome = document.getElementById('welcome')
const botonJugar = document.getElementById('boton-jugar').addEventListener('click', iniciarJuego)
const spanVida = document.getElementById('vida')
const spanLetras = document.getElementById('numPalabras')
const botonIntentar = document.getElementById('intentar').addEventListener('click', recolectarDatos)
const divLetras = document.getElementById('letras')
const muneco = document.getElementById('muneco')
const divEnd = document.getElementById('end')
const pEnd = document.getElementById('pend')
const restart = document.getElementById('reiniciar').addEventListener('click', reiniciarJuego)

//Lista con palabras
let listWords = ['open','closed','cold','sick','small','heavy','sleep','drink'];
//Obtener letra que escribio el jugador
let inputJuego = document.getElementById('inputJuego')
//variable para almacenar la palabra elegida
let palabra;
// cantidad de letras que tiene la palabra
let numLetras;
// vidas del jugador
let vida = 5;
// array con letras separadas
let arrayPalabra = [];
// letras acertadas
let palabrasAcertadas = 0;

// ocultar la interfaz de juego en la bienvenida
divJuego.style.display = 'none'
divEnd.style.display = 'none'


function iniciarJuego() {
// Esconder bienvenida y mostrar juego
    divWelcome.style.display = 'none'
    divJuego.style.display = 'block'

// elegir aleatoriamente una palabra
    elegirPalabra()
// poner en el html los datos de las palabras y la vida
    stats()
// agregar divs donde estaran las letras a adivinar
    divs(numLetras)
// agrega las imagenes del munheco
    munecoinsert()
}

function munecoinsert() {
// si la vida es 5 entonces mostrar la primera imagen del munheco, las demas imgenes con vida 4, 3, 2, 1
    if (vida == 5) {
        muneco.innerHTML= '<img src="./images/0.png"/>';    
    }else if (vida == 4) {
        muneco.innerHTML= '<img src="./images/1.png"/>';
    }
    else if (vida == 3) {
        muneco.innerHTML= '<img src="./images/2.png"/>';
    }
    else if (vida == 2) {
        muneco.innerHTML= '<img src="./images/3.png"/>';
    }
    else if (vida == 1) {
        muneco.innerHTML= '<img src="./images/4.png"/>';
    }else if (vida == 0) {
        muneco.innerHTML= '<img src="./images/5.png"/>';
    }
    
}

// funcion para obtener un numero aleatorio
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


function elegirPalabra() {
// elegir un palabra aleatoria
    let wordSelected = random(0, listWords.length);
// ponemos la palabra en la variable
    palabra = listWords[wordSelected];

// .length da un numero de mas del total de palabras, a veces sale undefine, entonces volvemos a elegir si pasa eso
    while (palabra == undefined) {
        elegirPalabra()
    }
// contamos las letras de la palabra
    numLetras = palabra.length
// spliteamos la palabra en varias letras dentro de un array
    arrayPalabra = palabra.split('')
// ayuda para ganar facil xd
    console.log(palabra)
}



function recolectarDatos() {
// obtenemos la letra que introdujo el jugador
    inputJuego = document.getElementById('inputJuego').value
// borramos la antigua letra del input para mas comodidad
    document.getElementById('inputJuego').value = ''
    console.log(inputJuego)

    verifyWord()
    stats()
    munecoinsert()
    
}

function divs(n) {
// bucle para crear divs en donde iran las letras
    for (let i = 0; i < n; i++) {
// creamos un div
        let div = document.createElement('div');
//creamos un p
        let guionbajo = document.createElement('p')
// asignamos un texto inicial a los divs
        guionbajo.innerHTML = '_'
// le damos un id diferente a cada p
        guionbajo.id = `pgen${i}`
// un id diferente a cada div
        div.id = `divgen${i}`
// al div podre le agregamos estos nuevos divs 
        divLetras.appendChild(div)
// a los divs hijos le agregamos el texto inicial
        div.appendChild(guionbajo)
    }
    
}


function verifyWord() {
// variable para ver con cuantos letras se hizo match
    let aciertosIndices = 0
// variables para alamcenar en que posicion deben ir las letras, son 3 en caso de tener una palabra con 3 letras repetidas
    let indiceEncontrado1 = null
    let indiceEncontrado2 = null
    let indiceEncontrado3 = null

// for para agregar las letras en su respectiva posicion
    for (let i = 0; i < arrayPalabra.length; i++) {
// 
        let letra = arrayPalabra[i];
        if (letra == inputJuego) {
            if (indiceEncontrado1 > 0) {
                indiceEncontrado2 = i
            }else if (indiceEncontrado2 > 0) {
                indiceEncontrado3 = i
            }else{
                indiceEncontrado1 = i
            }
            aciertosIndices++
            indiceEncontrado = i
        }else {
        }
    }

    if (aciertosIndices > 0) {
        console.log('Si esta')
    }else {
        console.log('No esta')
        vida--
    }
verifyPerder()


function setLetras() {

    for (let j = 0; j < numLetras; j++) {
        let divgen = document.getElementById(`divgen${j}`);
        let pgen = document.getElementById(`pgen${j}`)
        divgen.appendChild(pgen)

        if (indiceEncontrado1 != null) {
            if (j == indiceEncontrado1) {
                pgen.innerHTML = inputJuego
                palabrasAcertadas++
            }
            if (indiceEncontrado2 != null) {
                if (j == indiceEncontrado2) {
                    pgen.innerHTML = inputJuego
                    palabrasAcertadas++
                }
            }
            if (indiceEncontrado3 != null) {
                if (j == indiceEncontrado3) {
                    pgen.innerHTML = inputJuego
                    palabrasAcertadas++
                }
            }verifyGanar()
            
        }
    }
    
}

setLetras()
}

function stats() {
    spanVida.innerHTML = vida
    spanLetras.innerHTML = numLetras
}

function verifyGanar() {
    if (palabrasAcertadas == numLetras) {
        divJuego.style.display = 'none'
        divEnd.style.display = 'block'
        pEnd.innerHTML = 'Ganaste! 🎉'
    }
}

function verifyPerder() {
    if (vida == 0) {
        divJuego.style.display = 'none'
        divEnd.style.display = 'block'
        pEnd.innerHTML = 'Perdiste 💔'
    }
}

function reiniciarJuego() {
    location.reload()
}


