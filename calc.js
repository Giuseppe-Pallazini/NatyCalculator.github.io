// FALTANDO: DEIXAR EM NEGRITO APENAS O VALOR OU APENAS A PALAVRA



let error = document.querySelector('[name="error"]')
let button = document.querySelector('[joao]')

button.addEventListener('click', (event) => {
    event.preventDefault()

    qtdUsuariosValue = Number(document.querySelector('[name="usuarios"]').value);
    qtdWhatsappsValue = Number(document.querySelector('[name="whatsapps"]').value);
    qtdCreditosValue = Number(document.querySelector('[name="creditos"]').value);
    clienteParceiroValue = document.querySelector('[name="checkbox"]').checked;

    calcularProposta();
})

var valorTotalUsuarios;
var descontoUsuarios = 0;

var valorTotalWhatsapps;
var descontoWhatsapp = 0;

var valorTotalCreditos;
var descontoCreditos = 0;


function calcularProposta() {

    try {
        calcUsuario();
        calcWhatsApp();
        calcCreditos();
    
        adicionarInfosNoHtml();

        esconderErro()

    } catch (error) {
        exibirErro(error)
    }


}


// Calcular Usuários
function calcUsuario() {

    if(!qtdUsuariosValue) {
        throw new Error("Número Inválido");
    }

    if (qtdUsuariosValue >= 3 && qtdUsuariosValue <= 10) {
        calcValorEDescontoUsuarios(69.90, false);
    }
    else if (qtdUsuariosValue >= 11 && qtdUsuariosValue <= 20) {
        calcValorEDescontoUsuarios(59.90, true);
    }
    else if (qtdUsuariosValue >= 21 && qtdUsuariosValue <= 30) {
        calcValorEDescontoUsuarios(49.90, true);
    }
    else if (qtdUsuariosValue >= 31) {
        calcValorEDescontoUsuarios(39.90, true);
    }
    else {
        throw new Error("Número Inválido");
    }

}

// Calcular valor e desconto dos usuários
function calcValorEDescontoUsuarios(value, temDesconto) {
    qtdUsuariosValue = Math.floor(qtdUsuariosValue)
    valorTotalUsuarios = qtdUsuariosValue * value;

    if (temDesconto) { //* Cliente tem desconto nos Usuários
        descontoUsuarios = qtdUsuariosValue * 69.90 - valorTotalUsuarios
    }

    if (!temDesconto) { //! Cliente não tem desconto nos Usuários
        descontoUsuarios = 0
    }


    valorTotalUsuarios = valorTotalUsuarios.toFixed(2);
    valorTotalUsuarios = Number(valorTotalUsuarios);

    descontoUsuarios = descontoUsuarios.toFixed(2);
    descontoUsuarios = Number(descontoUsuarios)
}



// Calcular WhatsApps
function calcWhatsApp() {
    qtdWhatsappsValue = Math.floor(qtdWhatsappsValue)

    if(!qtdWhatsappsValue) {
        throw new Error("WhatsApp Inválido");
    }

    if (qtdWhatsappsValue >= 1 && qtdWhatsappsValue < 2) {
        valorTotalWhatsapps = 0;
    }
    else if (qtdWhatsappsValue >= 2 && qtdWhatsappsValue <= 3) {
        calcValorEDescontoWhatsapps(99.90, false);
    }
    else if (qtdWhatsappsValue >= 4 && qtdWhatsappsValue <= 5) {
        calcValorEDescontoWhatsapps(79.90, true);
    }
    else if (qtdWhatsappsValue >= 6 && qtdWhatsappsValue <= 7) {
        calcValorEDescontoWhatsapps(69.90, true);
    }
    else if (qtdWhatsappsValue >= 8 && qtdWhatsappsValue <= 10) {
        calcValorEDescontoWhatsapps(49.90, true);
    }
    else if (qtdWhatsappsValue >= 11) {
        calcValorEDescontoWhatsapps(39.90, true);
    } else {
        throw new Error("WhatsApp Inválido");
    }
}

// Calcular valor e desconto dos whatsapps
function calcValorEDescontoWhatsapps(value, temDesconto) {
    valorTotalWhatsapps = (qtdWhatsappsValue * value) - value;
    valorTotalWhatsapps = Number(valorTotalWhatsapps.toFixed(2));


    if (temDesconto) { //* Cliente tem desconto nos WhatsApps
        descontoWhatsapp = qtdWhatsappsValue * 99.90 - valorTotalWhatsapps;
    }

    if (!temDesconto) { //! Cliente não tem desconto nos WhatsApps
        descontoWhatsapp = 0;
    }

    valorTotalWhatsapps = Number(valorTotalWhatsapps);
    
    descontoWhatsapp = Number(descontoWhatsapp.toFixed(2));
}



// Calcular Créditos 
function calcCreditos() {
    qtdCreditosValue = Math.floor(qtdCreditosValue)



    if(!qtdCreditosValue) {
        throw new Error("Créditos Inválidos");
    }

    if (qtdCreditosValue >= 0 && qtdCreditosValue <= 100) {
        valorTotalCreditos = 0;
    }
    else if (qtdCreditosValue > 100 && qtdCreditosValue <= 500) {
        calcValorEDescontoCreditos(0.17);
    }
    else if (qtdCreditosValue > 500 && qtdCreditosValue <= 1000) {
        calcValorEDescontoCreditos(0.12);
    }
    else if (qtdCreditosValue > 1000 && qtdCreditosValue <= 2000) {
        calcValorEDescontoCreditos(0.10);
    }
    else if (qtdCreditosValue > 2000 && qtdCreditosValue <= 3000) {
        calcValorEDescontoCreditos(0.09);
    }
    else if (qtdCreditosValue > 3000 && qtdCreditosValue <= 5000) {
        calcValorEDescontoCreditos(0.08);
    }
    else if (qtdCreditosValue > 5000 && qtdCreditosValue <= 7500) {
        calcValorEDescontoCreditos(0.07);
    }
    else if (qtdCreditosValue > 7500 && qtdCreditosValue <= 10000) {
        calcValorEDescontoCreditos(0.06);
    }
    else if (qtdCreditosValue > 10000) {
        calcValorEDescontoCreditos(0.05);
    }
    else {
        throw new Error("Créditos Inválidos");
    }
}

// Calcular valor e desconto dos Créditos
function calcValorEDescontoCreditos(value) {
    qtdCreditosValue = Math.floor(qtdCreditosValue)
    valorTotalCreditos = Number(valorTotalCreditos)

    if (clienteParceiroValue) { // É cliente dos parceiros, então tem desconto
        valorTotalCreditos = qtdCreditosValue * 0.03;
        descontoCreditos = (qtdCreditosValue * value) - valorTotalCreditos;
    }

    else { // Não é cliente parceiro, então não tem desconto
        valorTotalCreditos = (qtdCreditosValue - 100) * value;
        descontoCreditos = 0
    }

    descontoCreditos = Number(descontoCreditos)
    valorTotalCreditos = Math.floor(valorTotalCreditos)
}
    
    var form = document.querySelector("form");

    var pUsuarios = criarTagP();
    var pDescontoUsuarios = criarTagP();

    var pWhatsapp = criarTagP();
    var pDescontoWhatsapp = criarTagP();

    var pCreditos = criarTagP();
    var pDescontoCreditos = criarTagP();

    var pValorTotal = criarTagP();
    var pDescontoValorTotal = criarTagP();


    function criarTagP() {
        return document.createElement("p");
    }

    function criarTagDiv(text) {
        let doc1 = document.createElement("div");
        return doc1.innerText = text;
    }

    var divOutput = document.createElement("div");
    divOutput.className = "divProposta";

    let divUsuarios = criarTagDiv("Usuários: R$ ");
    let divWhatsapp = criarTagDiv("WhatsApp's: R$ ");
    let divCreditos = criarTagDiv("Créditoss: R$ ");


function adicionarInfosNoHtml() {

    let valorTotal = valorTotalUsuarios + valorTotalWhatsapps + valorTotalCreditos + descontoUsuarios + descontoWhatsapp + descontoCreditos;
    valorTotal = Number(valorTotal);

    let valorTotalComDesconto = valorTotalUsuarios + valorTotalWhatsapps + valorTotalCreditos;

    pUsuarios.innerText = `Usuários: R$ ${valorTotalUsuarios.toFixed(2)}`;
    pDescontoUsuarios.innerText = `Desconto: R$ ${descontoUsuarios.toFixed(2)}`;

    pWhatsapp.innerText = `WhatsApp: R$ ${valorTotalWhatsapps.toFixed(2)}`;
    pDescontoWhatsapp.innerText = `Desconto: R$ ${descontoWhatsapp.toFixed(2)}`;

    pCreditos.innerText = `Créditos: R$ ${valorTotalCreditos.toFixed(2)}`;
    pDescontoCreditos.innerText = `Desconto: R$ ${descontoCreditos.toFixed(2)}`;

    pValorTotal.innerText = `Valor total: R$ ${valorTotal.toFixed(2)}`;
    pDescontoValorTotal.innerText = `Total com descontos: R$ ${valorTotalComDesconto.toFixed(2)}`;


    function atribuirClass() {
        pUsuarios.className = "valor_usuarios";
        pDescontoUsuarios.className = "valorDesconto_usuarios";

        pWhatsapp.className = "valor_whatsapps";
        pDescontoWhatsapp.className = "valorDesconto_whatsapps";

        pCreditos.className = "valor_creditos";
        pDescontoCreditos.className = "valorDesconto_creditos";

        pValorTotal.className = "valor_total";
        pDescontoValorTotal.className = "valorDesconto_total";
    }
    atribuirClass();

    let pAppends = [pUsuarios, pDescontoUsuarios, pWhatsapp, pDescontoWhatsapp, pCreditos, pDescontoCreditos, pValorTotal, pDescontoValorTotal]

    for(let i = 0; i < pAppends.length; i++) {
        divOutput.appendChild(pAppends[i]);
    }
    form.appendChild(divOutput)
}


function exibirErro(erro) {
    error.innerText = erro
    error.style.display = "block"

    divOutput.innerHTML = ''

}

function esconderErro() {
    error.innerText = "Error"
    error.style.display = "none"
}