async function carregarFaturamento() {
  try {
    const resposta = await fetch('https://script.google.com/macros/s/AKfycbyN8TJwiuWHMlaXVII4hM-xOvIo1opUJ7rukyQIS0aNEGufng9_TmePpuasuhK6Kva0/exec');
    const dados = await resposta.json();

    const elemento = document.getElementById('faturamento-dia');

    if (elemento && Array.isArray(dados) && dados.length > 0) {
      const primeiroItem = dados[0];
      const valor = primeiroItem["SUM de Total"];

      if (typeof valor === 'number') {
        const valorFormatado = `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        elemento.textContent = valorFormatado;
      } else {
        elemento.textContent = "Valor inválido";
      }
    } else {
      elemento.textContent = "Dados inválidos";
    }
  } catch (erro) {
    console.error("Erro ao buscar o valor:", erro);
    const elemento = document.getElementById('faturamento-dia');
    if (elemento) {
      elemento.textContent = "Erro ao carregar";
    }
  }
}

window.addEventListener('DOMContentLoaded', carregarFaturamento);
