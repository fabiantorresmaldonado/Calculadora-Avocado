function formatCurrency(value, currency = "MXN") {
    return `${currency === "USD" ? "$" : "$"}${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function calcular() {
    const precioDolar = parseFloat(document.getElementById("precioDolar").value);
    const cantidadKilos = parseFloat(document.getElementById("cantidadKilos").value);
    const precioPorKilo = parseFloat(document.getElementById("precioPorKilo").value);
    const porcentajeGastos = parseFloat(document.getElementById("porcentajeGastos").value) / 100;
    const transporte = parseFloat(document.getElementById("transporte").value);

    const calibres = {
        size32: {peso: 0.33, cantidad: 32, porcentaje: parseFloat(document.getElementById("size32").value) / 100},
        size36: {peso: 0.315, cantidad: 36, porcentaje: parseFloat(document.getElementById("size36").value) / 100},
        size40: {peso: 0.2825, cantidad: 40, porcentaje: parseFloat(document.getElementById("size40").value) / 100},
        size48: {peso: 0.235, cantidad: 48, porcentaje: parseFloat(document.getElementById("size48").value) / 100},
        size60: {peso: 0.1875, cantidad: 60, porcentaje: parseFloat(document.getElementById("size60").value) / 100},
        size70: {peso: 0.16, cantidad: 70, porcentaje: parseFloat(document.getElementById("size70").value) / 100},
        size84: {peso: 0.135, cantidad: 84, porcentaje: parseFloat(document.getElementById("size84").value) / 100},
    };

    let totalCajas = 0;
    let totalPrecioMXN = 0;
    let totalPrecioUSD = 0;
    let totalCajaGastosTransporteMXN = 0;
    let totalCajaGastosTransporteUSD = 0;

    const resultadoBody = document.querySelector("#resultado tbody");
    resultadoBody.innerHTML = "";

    for (const [size, {peso, cantidad, porcentaje}] of Object.entries(calibres)) {
        if (porcentaje > 0) {
            const kilosPorSize = cantidadKilos * porcentaje;
            const cajas = Math.floor(kilosPorSize / (peso * cantidad));
            const precioPorCajaMXN = precioPorKilo * peso * cantidad;
            const totalPrecioMXNSize = precioPorCajaMXN * cajas;
            const totalPrecioUSDSize = totalPrecioMXNSize / precioDolar;

            const precioCajaGastosMXN = precioPorCajaMXN * (1 + porcentajeGastos);
            const precioCajaGastosTransporteMXN = precioCajaGastosMXN + transporte / 1600;
            const totalCajaGastosTransporteMXNSize = precioCajaGastosTransporteMXN * cajas;

            const precioCajaGastosUSD = precioCajaGastosMXN / precioDolar;
            const precioCajaGastosTransporteUSD = precioCajaGastosTransporteMXN / precioDolar;
            const totalCajaGastosTransporteUSDSize = totalCajaGastosTransporteMXNSize / precioDolar;

            totalCajas += cajas;
            totalPrecioMXN += totalPrecioMXNSize;
            totalPrecioUSD += totalPrecioUSDSize;
            totalCajaGastosTransporteMXN += totalCajaGastosTransporteMXNSize;
            totalCajaGastosTransporteUSD += totalCajaGastosTransporteUSDSize;

            const row = `<tr>
                <td>${size}</td>
                <td>${cajas.toLocaleString()}</td>
                <td>${formatCurrency(precioPorCajaMXN)}</td>
                <td>${formatCurrency(totalPrecioMXNSize)}</td>
                <td>${formatCurrency(precioCajaGastosMXN)}</td>
                <td>${formatCurrency(precioCajaGastosTransporteMXN)}</td>
                <td>${formatCurrency(totalCajaGastosTransporteMXNSize)}</td>
                <td>${formatCurrency(precioPorCajaMXN / precioDolar, "USD")}</td>
                <td>${formatCurrency(totalPrecioUSDSize, "USD")}</td>
                <td>${formatCurrency(precioCajaGastosTransporteUSD, "USD")}</td>
                <td>${formatCurrency(totalCajaGastosTransporteUSDSize, "USD")}</td>
            </tr>`;
            resultadoBody.innerHTML += row;
        }
    }

    document.getElementById("totalCajas").textContent = totalCajas.toLocaleString();
    document.getElementById("totalPrecioMXN").textContent = formatCurrency(totalPrecioMXN);
    document.getElementById("totalCajaGastosTransporteMXN").textContent = formatCurrency(totalCajaGastosTransporteMXN);
    document.getElementById("totalPrecioUSD").textContent = formatCurrency(totalPrecioUSD, "USD");
    document.getElementById("totalCajaGastosTransporteUSD").textContent = formatCurrency(totalCajaGastosTransporteUSD, "USD");

    document.getElementById("resultado").style.display = "table";
}
