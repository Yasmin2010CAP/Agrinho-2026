   // 1. MODO NOTURNO / ALTO CONTRASTE
const botaoContraste = document.getElementById("btn-contraste");

if (botaoContraste) {
    botaoContraste.onclick = function() {
        document.body.classList.toggle("alto-contraste");

        // Gerencia a troca visual da logo se necessário
        const logo = document.getElementById("logo");
        if (logo) {
            if (document.body.classList.contains("alto-contraste")) {
                // logo.src = "img/logo_escura.jpg"; 
            } else {
                logo.src = "img/logo1.jpg";
            }
        }
    };
}

   // 2. NAVEGAÇÃO ENTRE PÁGINAS (ABAS)
function mostrarPagina(idPagina) {
    // Seleciona todas as seções que possuem a classe "pagina"
    const paginas = document.querySelectorAll(".pagina");

    // Remove a classe "ativa" de todas para escondê-las
    paginas.forEach(function(pagina) {
        pagina.classList.remove("ativa");
    });

    // Localiza a página clicada pelo ID e adiciona a classe "ativa" para mostrá-la
    const paginaAlvo = document.getElementById(idPagina);
    if (paginaAlvo) {
        paginaAlvo.classList.add("ativa");
    } else {
        console.error("Erro: A página com o ID '" + idPagina + "' não foi encontrada.");
    }
}

   // 3. CALCULADORA DE CARBONO
function calcularCarbono() {
    // Captura os elementos de entrada do HTML
    const campoTratores = document.getElementById("tratores");
    const campoCombustivel = document.getElementById("combustivel");
    const campoAnimais = document.getElementById("animais");
    const resultado = document.getElementById("resultado-carbono");

    // Validação de segurança: verifica se todos os elementos existem no HTML
    if (!campoTratores || !campoCombustivel || !campoAnimais || !resultado) {
        alert("Erro no sistema: Verifique se os IDs dos elementos no HTML estão corretos.");
        return;
    }

    // Validação de preenchimento: impede campos vazios
    if (campoTratores.value === "" || campoCombustivel.value === "" || campoAnimais.value === "") {
        alert("Por favor, preencha todos os campos da calculadora (digite 0 se não houver).");
        return;
    }

    // Converte os valores textuais para números decimais/inteiros
    const tratores = Number(campoTratores.value);
    const combustivel = Number(campoCombustivel.value);
    const animais = Number(campoAnimais.value);

    // Aplicação da fórmula matemática de estimativa
    const carbono = (tratores * 120) + (combustivel * 2.5) + (animais * 15);

    // Variáveis de controle para a classificação do impacto ambiental
    let classificacao = "";
    let corTexto = "";
    let mensagemDica = "";

    // Regras de negócio para definir se o impacto é Bom, Médio ou Ruim
    if (carbono <= 1500) {
        classificacao = "BOM (Sustentável)";
        corTexto = "var(--cor-destaque)"; 
        mensagemDica = "Sua fazenda está operando com um excelente nível de emissões! Continue aplicando práticas sustentáveis.";
    } else if (carbono > 1500 && carbono <= 5000) {
        classificacao = "MÉDIO (Moderado)";
        corTexto = "#fcd34d"; // Amarelo suave que combina com o verde
        mensagemDica = "A emissão está moderada. Veja a aba 'ABC' para conhecer planos de redução de carbono no solo.";
    } else {
        classificacao = "RUIM (Alto)";
        corTexto = "#f87171"; // Vermelho pastel claro para contraste
        mensagemDica = "Alerta de altas emissões! Considere o uso de Bioenergia para substituir combustíveis fósseis e aplique o MIP.";
    }

 // Exibe o bloco de resultados alterando a propriedade display do CSS e inserindo o HTML interno
resultado.style.display = "block";
resultado.innerHTML = `
    <div style="margin-top: 20px; padding: 15px; border: 2px solid var(--cor-borda); border-radius: 8px; background-color: #ffffff; color: #1c352d; text-align: left;">
        <h3 style="color: #ffffff; margin-top: 0; font-family: 'Orbitron', sans-serif;">Resultado da Análise:</h3>
        <p style="margin: 8px 0; color: #000000;">A estimativa de emissão é de: <strong>${carbono.toFixed(2)} kg de carbono</strong>.</p>
        <p style="margin: 8px 0; color: #000000;">Status do Impacto: <span style="color: ${corTexto}; font-weight: bold; font-size: 1.1em;">${classificacao}</span></p>
        <p style="font-style: italic; margin-top: 12px; margin-bottom: 0; color: #555555; opacity: 0.9; font-size: 0.95em;">${mensagemDica}</p>
    </div>
`;
