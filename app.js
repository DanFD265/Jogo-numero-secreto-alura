let respostasUsadas = [];
let possibilidades = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
    if (chute==numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let mensagemTentativas = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        tentativas++
        exibirTextoNaTela('h1', 'Errou');
        if (chute>numeroSecreto) {
            exibirTextoNaTela('p', 'Tente um número menor');
        } else {
            exibirTextoNaTela('p', 'Tente um número maior');
        }
    }
    limparCampo();
}

function gerarNumeroAleatorio() {
    let respostas = parseInt(Math.random() * possibilidades + 1);
    let qntdElementos = respostasUsadas.length;

    if (qntdElementos == possibilidades) {
        respostasUsadas = [];
    }

    if (respostasUsadas.includes(respostas)) {
        return gerarNumeroAleatorio();
    } else {
        respostasUsadas.push(respostas);
        console.log(respostasUsadas);
        return respostas;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ('');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}