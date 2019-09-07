var imagens = [ 24 ];
var firstCard = true;
var card1Src, card1Id;
var cardsAbertos = [];

armazenaNomes();
imagens = embaralhaArray(imagens);
distribuiLogos();

function armazenaNomes() {
    for (let i = 0; i < 24; i++) {

        if (imagens.length >= 12) {
            imagens.push(('0' + (i - 11)).substr(-2) + '.png');
        } else {
            imagens[i] = ('0' + (i + 1)).substr(-2) + '.png';
        }
    }
}

function embaralhaArray(array) {

    var aux, randomIndex;

    for (let indiceAtual = (array.length - 1); indiceAtual >= 0; indiceAtual-= 1 ) {

        randomIndex = Math.floor(Math.random() * indiceAtual);

        aux = array[indiceAtual];
        array[indiceAtual] = array[randomIndex];
        array[randomIndex] = aux;
    }

    return array;
}

function distribuiLogos() {
    let cardsImage = document.querySelectorAll('.memory-card img.logo');
    let cardsDiv = document.querySelectorAll('.memory-card');

    for (let i = 0; i< cardsImage.length; i++) {
        cardsImage[i].src = 'images/' + imagens[i];
        cardsImage[i].style.visibility = 'hidden';
    }

    for (let i = 0; i< cardsDiv.length; i++) {

        cardsDiv[i].onclick = function() {
            validaCarta(this.id);
        }; //e manda o id, porque com ele a gente pega o src e o id que da pra excluir dps

    }
}

function validaCarta(id) {

    let card = document.querySelector('#' + id);


    if (cardsAbertos.indexOf(id) !== -1) {
        alert('o card ja foi aberto amigao');
    }
    else {
        realizaEscolha(id);
    }
}


function viraCarta(card) {


    if (card.firstElementChild.style.visibility === 'hidden') {
        card.firstElementChild.style.visibility = 'visible';
    } else {
        card.firstElementChild.style.visibility = 'hidden';
    }
}


function realizaEscolha(id) {
    if(!firstCard && document.querySelector('#' + id).id == card1.id) {
        alert("Parado aí forasteiro!");
    } else if(document.querySelector('#' + id).style.visibility == 'visible') {
        alert('HAHA ja esta levantada meu rei');
    } else if (firstCard) {
        card1 = document.querySelector('#' + id);
        viraCarta(card1);
        firstCard = false;
    } else {
        let card2 = document.querySelector('#' + id);
        viraCarta(card2);


        if ( card1.firstElementChild.src == card2.firstElementChild.src ) {
            alert('BOA MEU MANO');
            cardsAbertos.push(card1.id);
            cardsAbertos.push(card2.id);

        } else {
            alert('NOOOOPE');

            setTimeout( function() {
                viraCarta(card1);
                viraCarta(card2);
            }, 2000);

        }

        firstCard = true;
    }
}
