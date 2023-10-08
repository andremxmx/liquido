class Empleado {
    constructor(sueldoBruto, conyuge, hijos) {
        this.sueldoBruto = sueldoBruto;
        this.conyuge = conyuge;
        this.hijos = hijos;
    }

    calcularSueldoLiquido() {
        let porcentajeBPS = 0.15; 
        let porcentajeFRL = 0.001; 
        let BPC = 5660; 

        let deduccionBPS = this.sueldoBruto * porcentajeBPS;
        let deduccionFRL = this.sueldoBruto * porcentajeFRL;

        let deduccionFONASA;
        if (!this.hijos && !this.conyuge) {
            deduccionFONASA = 0.045 * this.sueldoBruto;
        } else if (this.hijos && !this.conyuge) {
            deduccionFONASA = 0.06 * this.sueldoBruto;
        } else if (!this.hijos && this.conyuge) {
            deduccionFONASA = 0.065 * this.sueldoBruto;
        } else if (this.hijos && this.conyuge) {
            deduccionFONASA = 0.08 * this.sueldoBruto;
        }

        let franjasIRPF = [
            {desde: 0, hasta: 7 * BPC, tasa: 0},
            {desde: 7 * BPC + 1, hasta: 10 * BPC, tasa: 0.10},
            {desde: 10 * BPC + 1, hasta: 15 * BPC, tasa: 0.15},
            {desde: 15 * BPC + 1, hasta: 30 * BPC, tasa: 0.24},
            {desde: 30 * BPC + 1, hasta: 50 * BPC, tasa: 0.25},
            {desde: 50 * BPC + 1, hasta: 75 * BPC, tasa: 0.27},
            {desde: 75 * BPC + 1, hasta: 115 * BPC, tasa: 0.31},
            {desde: 115 * BPC + 1, hasta: Number.MAX_SAFE_INTEGER, tasa: 0.36}
        ];

        let renta = this.sueldoBruto - (this.sueldoBruto * porcentajeBPS); 
        let IRPF = 0;
        let franjasUtilizadas = [];

        for (let i = franjasIRPF.length - 1; i >= 0; i--) {
            if (renta > franjasIRPF[i].desde) {
                let impuestoFranja = (renta - franjasIRPF[i].desde) * franjasIRPF[i].tasa;
                IRPF += impuestoFranja;
                franjasUtilizadas.push({franja: franjasIRPF[i], impuesto: impuestoFranja});
                renta = franjasIRPF[i].desde;
            }
        }

        let sueldoLiquido = this.sueldoBruto - (deduccionBPS + deduccionFRL + deduccionFONASA + IRPF);
        
        let descuentos = {
            'BPS': deduccionBPS.toFixed(2),
            'FRL': deduccionFRL.toFixed(2),
            'FONASA': deduccionFONASA.toFixed(2),
            'IRPF': {total: IRPF, franjasUtilizadas: franjasUtilizadas}
        };

        return {sueldoLiquido, descuentos};
    }
}

document.getElementById("calculateButton").addEventListener("click", function() {
    var sueldoBruto = document.getElementById("sueldoBruto").value;
    var conyuge = document.getElementById("conyuge").checked;
    var hijos = document.getElementById("hijos").checked;

    var empleado = new Empleado(sueldoBruto, conyuge, hijos);
    var resultado = empleado.calcularSueldoLiquido();

    var resultsDiv = document.getElementById("results");
    
    resultsDiv.innerHTML = "";
    resultsDiv.className = "mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

    var resultCard = document.createElement("div");
    resultCard.className = "bg-blue-500 p-4 rounded-lg shadow-lg text-white md:col-span-3";
    var resultTitle = document.createElement("h2");
    resultTitle.textContent = "Sueldo Líquido";
    resultTitle.className = "text-xl font-bold mb-2";
    var resultText = document.createElement("p");
    resultText.textContent = resultado.sueldoLiquido.toFixed(2);
    resultCard.appendChild(resultTitle);
    resultCard.appendChild(resultText);
    resultsDiv.appendChild(resultCard);

    Object.entries(resultado.descuentos).forEach(([key, value]) => {
        if (key !== 'IRPF') {
            var discountCard = document.createElement("div");
            discountCard.className = "bg-gray-700 p-4 rounded-lg shadow-lg text-white md:col-span-1";

            var discountTitle = document.createElement("h2");
            discountTitle.textContent = key;
            discountTitle.className = "text-xl font-bold mb-2";

            var discountText = document.createElement("p");
            discountText.textContent = value;

            discountCard.appendChild(discountTitle);
            discountCard.appendChild(discountText);
            resultsDiv.appendChild(discountCard);
        }
    });
//...
var irpfData = resultado.descuentos['IRPF'];
if (irpfData) {
    var irpfCard = document.createElement("div");
    irpfCard.className = "bg-gray-700 p-4 rounded-lg shadow-lg text-white mt-4 md:col-span-3";

    var irpfTitle = document.createElement("h2");
    irpfTitle.textContent = 'IRPF';
    irpfTitle.className = "text-xl font-bold mb-2 text-center";

    irpfCard.appendChild(irpfTitle);

    var franjasGrid = document.createElement("div");
    franjasGrid.className = "grid grid-cols-3 gap-4";

    if (irpfData.franjasUtilizadas.length > 3) {
        franjasGrid.className = "grid grid-cols-3 gap-4 grid-flow-row-dense";
    }

    var totalImpuesto = 0;

    irpfData.franjasUtilizadas.reverse().forEach((franja, index) => {
        var franjaCard = document.createElement("div");
        franjaCard.className = "bg-gray-600 p-2 rounded-lg shadow-md text-white";

        var franjaText = document.createElement("p");
        franjaText.textContent = 'Franja ' + (index + 1) + ': ' + parseFloat(franja.impuesto).toFixed(2);

        totalImpuesto += parseFloat(franja.impuesto);

        franjaCard.appendChild(franjaText);

        if (irpfData.franjasUtilizadas.length > 3 && index < irpfData.franjasUtilizadas.length - 3) {
            franjaCard.style.gridColumn = "span 1";
        }

        franjasGrid.appendChild(franjaCard);
    });

    var totalCard = document.createElement("div");
    totalCard.className = "bg-gray-800 p-2 rounded-lg shadow-md text-white mt-4 col-span-full";
    totalCard.textContent = 'Total IRPF: ' + totalImpuesto.toFixed(2);
    
    franjasGrid.appendChild(totalCard);

    irpfCard.appendChild(franjasGrid);
    resultsDiv.appendChild(irpfCard);
}
});
