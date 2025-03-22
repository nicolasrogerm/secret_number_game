let listaNumerosSorteados = [];
let quantidadeDeElementosPermitidos = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
exibirTextoInicial();
document.getElementById('chutar').removeAttribute('disabled', false);

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
}


function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    if (isNaN(chute)) {
        return exibirTextoNaTela('p', 'Por favor, digite um número válido.'); 
    }

    tentativas++; // tentativas = tentativas + 1

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemTentativas = `Parabéns, você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled', false);
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        if (numeroSecreto > chute) {
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}.`);
        }
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * quantidadeDeElementosPermitidos + 1);
    let quatidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quatidadeDeElementosNaLista == quantidadeDeElementosPermitidos){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled', false);
}