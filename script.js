// caracteristica e atributo pro molde do parquimetro:
// As regras de tempo e valor (R$ 1,00 = 30 min, R$ 1,75 = 60 min, R$ 3,00 = 120 min).
class Parquimetro {
  constructor() {
    this.regras = [
      { valor: 1.0, tempo: 30 },
      { valor: 1.75, tempo: 60 },
      { valor: 3.0, tempo: 120 },
    ];
  }

  // ações do parquimetro
  calcularTicket(valorPago) {
    if (valorPago < 1.0) {
      return "Saldo insuficiente. Por favor insira um novo valor";
    }

    if (valorPago >= 3.0) {
      const tempo = 120; // 120 minutos
      const troco = valorPago - 3.0;
      return {
        tempo: tempo,
        troco: troco.toFixed(2), // forma o troco com 2 casas decimais
      };
    } else if (valorPago >= 1.75) {
      const tempo = 60; // 60 minutos
      const troco = valorPago - 1.75;
      return {
        tempo: tempo,
        troco: troco.toFixed(2),
      };
    } else {
      // Se não foi >= 3.00 nem >= 1.75, só pode ser >= 1.00
      const tempo = 30; // 30 minutos
      const troco = valorPago - 1.0;
      return {
        tempo: tempo,
        troco: troco.toFixed(2),
      };
    }
  }
}

// instancia
const meuParquimetro = new Parquimetro();

// unindo com o html
const valorInput = document.getElementById("valor-inserido");
const calcularBtn = document.getElementById("calcular-btn");
const limparBtn = document.getElementById("limpar-btn");
const tempoDisplay = document.getElementById("tempo-permanencia");
const trocoDisplay = document.getElementById("troco-valor");

// add a reação ao botão
calcularBtn.addEventListener("click", function () {
  // obtendo o valor e ajustando pra num
  const valorInserido = parseFloat(valorInput.value);
  const resultado = meuParquimetro.calcularTicket(valorInserido);

  if (typeof resultado === "string") {
    // se o resulado for uma string vai dar alerta do erro
    tempoDisplay.textContent = resultado;
    trocoDisplay.textContent = "Troco: --"; // limpa o troco
  } else {
    // se for um objeto retorna o tempo e o troco
    tempoDisplay.textContent = `Tempo: ${resultado.tempo} minutos`;
    trocoDisplay.textContent = `Troco: R$ ${resultado.troco}`;
  }
});

// add um botão de limpar
limparBtn.addEventListener("click", function () {
  valorInput.value = "";
  tempoDisplay.textContent = "Tempo: --";
  trocoDisplay.textContent = "Troco: --";
});
