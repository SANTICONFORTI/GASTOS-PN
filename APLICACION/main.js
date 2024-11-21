// Registrar el service worker para habilitar la funcionalidad offline
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registrado con éxito:", registration);
            })
            .catch((error) => {
                console.log("Error al registrar el Service Worker:", error);
            });
    });
}

function toggleInputs() {
    const calculationType = document.getElementById("calculationType").value;
    const dateRangeInputs = document.getElementById("dateRangeInputs");
    if (calculationType === "dateRange") {
        dateRangeInputs.style.display = "block";
    } else {
        dateRangeInputs.style.display = "none";
    }
}

function calcularGastos() {
    const calculationType = document.getElementById("calculationType").value;
    const totalMoney = parseFloat(document.getElementById("totalMoney").value);
    if (isNaN(totalMoney) || totalMoney <= 0) {
        document.getElementById("gastosResult").innerText = "Por favor, ingresa un monto válido.";
        return;
    }

    if (calculationType === "currentMonth") {
        calcularGastosMes(totalMoney);
    } else if (calculationType === "dateRange") {
        calcularGastosEntreFechas(totalMoney);
    }
}

function calcularGastosMes(totalMoney) {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysLeft = daysInMonth - currentDate.getDate();

    if (daysLeft <= 0) {
        document.getElementById("gastosResult").innerText = "No quedan días en este mes.";
    } else {
        const gastoDiario = (totalMoney / daysLeft).toFixed(2);
        document.getElementById("gastosResult").innerText = `Podés gastar $${gastoDiario} por día hasta fin de mes.`;
    }
}

function calcularGastosEntreFechas(totalMoney) {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    if (isNaN(startDate) || isNaN(endDate)) {
        document.getElementById("gastosResult").innerText = "Por favor, seleccioná fechas válidas.";
        return;
    }
    if (startDate >= endDate) {
        document.getElementById("gastosResult").innerText = "La fecha de inicio tiene que ser anterior a la fecha de fin.";
        return;
    }

    const timeDifference = endDate - startDate;
    const daysBetween = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const gastoDiario = (totalMoney / daysBetween).toFixed(2);
    document.getElementById("gastosResult").innerText = `Podés gastar $${gastoDiario} por día desde ${startDate.toLocaleDateString()} hasta ${endDate.toLocaleDateString()}.`;
}

// Animación de resultados
function mostrarResultado(idResultado, resultado) {
    const resultElement = document.getElementById(idResultado);
    resultElement.innerText = resultado;
    resultElement.classList.add('show');
}

function calcularPatrimonio() {
    const assets = parseFloat(document.getElementById("assets").value);
    const debts = parseFloat(document.getElementById("debts").value);
    const owed = parseFloat(document.getElementById("owed").value);

    if (isNaN(assets) || isNaN(debts) || isNaN(owed)) {
        document.getElementById("patrimonioResult").innerText = "Por favor, ingresá valores válidos.";
        return;
    }

    const patrimonioNeto = (assets + owed - debts).toFixed(2);
    mostrarResultado("patrimonioResult", `Tu patrimonio neto es $${patrimonioNeto}.`);
}

// Hacer que los botones sean más grandes en dispositivos móviles
if (window.innerWidth <= 768) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.style.fontSize = '18px';
        button.style.padding = '20px';
    });
}
function showPatrimonio() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("patrimonioScreen").style.display = "block";
}

function showGastos() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gastosScreen").style.display = "block";
}

function backToHome() {
    document.getElementById("patrimonioScreen").style.display = "none";
    document.getElementById("gastosScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
}

