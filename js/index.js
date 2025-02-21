async function converterMoeda(valor, moedaOrigem, moedaDestino) {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem.toUpperCase()}`);
      const data = await response.json();
      const rates = data.rates;
      // Conversão específica
      const valorConvertido = valor * rates[moedaDestino.toUpperCase()];
      // Calcula conversão para todas as moedas disponíveis usando .map()
      const conversoes = Object.keys(rates).map(moeda => {
        return { moeda, valor: (valor * rates[moeda]).toFixed(2) };
      });
      return { valorConvertido: valorConvertido.toFixed(2), conversoes };
    } catch (error) {
      console.error("Erro na conversão:", error);
      return null;
    }
  }

  function executaConversao() {
    const valor = parseFloat(document.getElementById("valor").value);
    const moedaOrigem = document.getElementById("moeda-origem").value;
    const moedaDestino = document.getElementById("moeda-destino").value;
    if (isNaN(valor) || !moedaOrigem || !moedaDestino) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
    converterMoeda(valor, moedaOrigem, moedaDestino).then(resultado => {
      if (resultado) {
        let html = `<p>${valor} ${moedaOrigem.toUpperCase()} = ${resultado.valorConvertido} ${moedaDestino.toUpperCase()}</p>`;
        document.getElementById("resultado-conversao").innerHTML = html;
      } else {
        document.getElementById("resultado-conversao").innerText = "Erro ao converter moeda.";
      }
    });
  }