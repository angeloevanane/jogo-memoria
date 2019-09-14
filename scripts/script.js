console.log('O que você está procurando por aqui?');

var imagens = [ 24 ];
var firstCard = true;
var cardsAbertos = [];
var btnElement = document.querySelector('#btnReiniciar');
btnElement.onclick = zeraJogo;

armazenaNomes();
imagens = embaralhaArray(imagens);
distribuiLogos();
zeraJogo();

function zeraJogo() {

    let cards = document.querySelectorAll('.memory-card');
//checkpoint
    for (let card of cards) {
        card.style.backgroundColor = 'white';

        card.onmouseover = function() {
            card.style.backgroundColor = 'silver';
        }

        card.onmouseout = function() {
            card.style.backgroundColor = 'white';
        }

        card.style.opacity = 1;
        card.style.borderColor = 'black';
    }

    firstCard = true;
    cardsAbertos = [];
    imagens = embaralhaArray(imagens);
    distribuiLogos();
    exibeCards();

}

function exibeCards() {

    let cards = document.querySelectorAll('.memory-card');

    for (const card of cards) {
        card.firstElementChild.style.visibility = 'visible';
        card.onclick = function () {
            //alert('wait');
        }
    }

    setTimeout( function() {
        for (const card of cards) {
            card.firstElementChild.style.visibility = 'hidden';
            card.onclick = function() {
                validaCarta(this.id);
            };
        }
    }, 1100);

}

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

    if (cardsAbertos.indexOf(id) !== -1) {
        alert('O card já foi escolhido');
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
        //alert('Você não pode escolher o mesmo card');
        alert('Parado aí forasteiro!');
    } else if (firstCard) {
        card1 = document.querySelector('#' + id);
        viraCarta(card1);
        firstCard = false;
    } else {
        let card2 = document.querySelector('#' + id);
        viraCarta(card2);


        if ( card1.firstElementChild.src == card2.firstElementChild.src ) {

            cardsAbertos.push(card1.id);
            cardsAbertos.push(card2.id);

            excluiCard(card1);
            excluiCard(card2);

            if (cardsAbertos[23] != undefined) {
                setTimeout(function(){
                    alert('Parabéns!');
                }, 600);
            }
        } else {
            desativaClicksDiv();

            setTimeout( function() {
                viraCarta(card1);
                viraCarta(card2);
                ativaClicksDiv();
            }, 1000);

        }

        firstCard = true;
    }
}

function desativaClicksDiv() {
    let cardsDiv = document.querySelectorAll('.memory-card');

        for (let i = 0; i< cardsDiv.length; i++) {
            cardsDiv[i].onclick = function() {
                //alert('wait!');
            };
        }
}

function ativaClicksDiv() {
    let cardsDiv = document.querySelectorAll('.memory-card');

    for (let i = 0; i< cardsDiv.length; i++) {

        cardsDiv[i].onclick = function() {
            validaCarta(this.id);
        };
    }
}

function excluiCard(card) {

    card.onmouseout = null;
    card.onmouseover = null;

    card.style.backgroundColor = 'silver';
    card.style.opacity = 0.3;
    card.style.borderColor = 'gray';
}
