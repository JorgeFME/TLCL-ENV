
// ++++++++++++++++++++++++++++++++++++++++++ Funciones para formato ANTERIOR +++++++++++++++++++++++

// Funcion para generar los encabezados en la tabla
function generateTableHead(table, data) {
    // console.log("Entra A GENERAR ENCABEZADOS")
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    for (var key of data) {
        var th = document.createElement("th");
        var text = document.createTextNode(key);
        th.appendChild(text);
        th.classList.add("text-center"); // Centrar texto en las cabeceras de columna
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
}

function generateTableRow(table, data) {
    var tbody = table.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    var newRow = document.createElement("tr");
    data.forEach((row, index) => {
        var cell = document.createElement("td");
        var text = document.createTextNode(row);
        cell.appendChild(text);
        cell.className = 'cellStyle';
        cell.classList.add("text-center"); // Centrar texto en las celdas de datos

        // cell.id = "row" + index;
        // console.log(row);

        // if (rpusDuplicados.length > 0) {
        //     for (let i = 0; i < rpusDuplicados.length; i++) {
        //         const element = rpusDuplicados[i];
        //         if (row == element) {
        //             cell.id = "row";
        //         }
        //     }
        // }

        newRow.appendChild(cell);
    });
    tbody.appendChild(newRow);
}

function findMonthandYear(res) {

    let date = [];

    // EXTARE EL MES Y AÑO DE LAS PRIMERAS FILAS
    for (let i = 0; i < res.length; i++) {
        const element = res[i];
        console.log(element);
        if (element[0] == 'Empresa:') {
            const indexDate = res[i + 1]
            console.log("INDEXDATE", indexDate);
            const dataCleanDate = indexDate.filter(function (e) { return e !== null })
            let arr = dataCleanDate[0].split(' ');
            // console.log(arr[0]);
            date.push(arr[0]);
            date.push(arr[2])

        }
    }
    return date
}

const getNumberOfMonth = (date) => {
    // console.log(date)

    let numberOfMonth;

    for (const key in monthList) {
        if (Object.hasOwnProperty.call(monthList, key)) {
            const element = monthList[key];
            // console.log(element);
            if (date == element[0]) {
                // console.log('El mes del archivo es ' + element[0] + ' y en numero es: ' + element[1]);
                numberOfMonth = element[1];

            }
        }
    }
    return numberOfMonth;
}

const checkFormat = (result) => {
    let tipoFormato = selectedOption;
    // console.log("Check formato: ", tipoFormato);

    let flagFormato = true;

    const checkEmpresaV1 = result.findIndex(wordCheckEmpresa => wordCheckEmpresa[0] === 'Empresa:');
    const checkEmpresaV2 = result.findIndex(wordcheckPeriodo => wordcheckPeriodo[0] === 'Empresa');

    // console.log("GRRRR")
    console.log(checkEmpresaV1);
    console.log(checkEmpresaV2);

    if (checkEmpresaV1 !== 0) {
        // console.log("Es anterior");
        if (selectedOption == 'version1') {
            console.log("Formato equivocado, deberia ser formato anterior")
            flagFormato = false;
        }
        // flagFormato = '';
    } else if (checkEmpresaV2 !== 0) {
        // console.log("Es Nuevo")
        if (selectedOption == 'version2') {
            console.log("Formato Equivocado, deberia ser formato nuevo")
            flagFormato = false;
        }
    }

    console.log("BEEEEEE: ", flagFormato)
    return flagFormato;


}

// +++++++++++++++++++++++++++++++++++++++++ Funciones para formato Nuevo +++++++++++++++++++++++++++

function generateTableHeadersNue(table, data) {
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    for (var key of data) {
        var th = document.createElement("th");
        var text = document.createTextNode(key);
        th.appendChild(text);
        th.classList.add("text-center"); // Centrar texto en las cabeceras de columna
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
}

function generateTableRowNue(table, data) {
    var tbody = table.querySelector("tbody");
    if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
    }

    var newRow = document.createElement("tr");
    data.forEach((row, index) => {
        var cell = document.createElement("td");
        var text = document.createTextNode(row);
        cell.appendChild(text);
        cell.className = 'cellStyle';
        cell.classList.add("text-center"); // Centrar texto en las celdas de datos

        newRow.appendChild(cell);
    });
    tbody.appendChild(newRow);
}

function findMonthandYearNue(result) {
    const indexPeriodo = result.findIndex(numindexPeriodo => numindexPeriodo[0] === 'Periodo');
    if (indexPeriodo === -1) {
        console.log('No se encontró el período en result.');
        return null; // O manejar el error de alguna otra forma
    }

    const periodoData = result[indexPeriodo];
    const periodoDataFiltrado = periodoData.filter(item => item !== null);

    if (periodoDataFiltrado.length < 2) {
        console.log('No hay datos suficientes para extraer la fecha.');
        return null; // O manejar el error de alguna otra forma
    }

    const fecha = periodoDataFiltrado[1];

    let año, mes;

    // Verificar el formato de la fecha
    if (fecha.length === 6) {
        // Formato '202404'
        año = fecha.substring(0, 4);
        mes = fecha.substring(4, 6);
    } else if (fecha.length === 7 && fecha.includes('-')) {
        // Formato '2024-04'
        const partesFecha = fecha.split('-');
        año = partesFecha[0];
        mes = partesFecha[1];
    } else {
        console.log('Formato de fecha no reconocido.');
        return null; // O manejar el error de alguna otra forma
    }

    // Retornar ambos valores como números
    // console.log("año", año);
    // console.log("Mes", mes)
    return [año, mes];
}

function getMonthNameNue(number) {
    // Convertir el número del mes a string para la comparación
    const numeroMesStr = parseInt(number, 10).toString();

    // Buscar el nombre del mes correspondiente
    for (let i = 0; i < monthListNue.length; i++) {
        if (monthListNue[i][1] === numeroMesStr) {
            return monthListNue[i][0];
        }
    }

    // Si no se encuentra el mes, devolver un mensaje de error o vacío
    return 'Mes no válido';
}

const FormattingDate = (dateWithoutFormat) => {
    let dateObj = new Date(dateWithoutFormat);

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj);

    // console.log(formattedDate);

    // Divide la fecha formateada en día, mes y año
    let [day, month, year] = formattedDate.split('/');

    return [day, month, year];
}

