
const monthListNue = [
    ['ENERO', '1'],
    ['FEBRERO', '2'],
    ['MARZO', '3'],
    ['ABRIL', '4'],
    ['MAYO', '5'],
    ['JUNIO', '6'],
    ['JULIO', '7'],
    ['AGOSTO', '8'],
    ['SEPTIEMBRE', '9'],
    ['OCTUBRE', '10'],
    ['NOVIEMBRE', '11'],
    ['DICIEMBRE', '12'],
]

const extraDatesNue = [
    'Año',
    'Mes (number)',
    'Mes (String)',
    'Dia Desde',
    'Mes Desde', 'Año Desde', 'Dia Hasta', 'Mes Hasta', 'Año Hasta'
];

const formatoNuevo = (result) => {

    console.log("Hola")
    console.log(result)

    if (result != undefined) {

        let flagFormato = checkFormat(result);
        console.log(flagFormato)

        if (flagFormato == false) {
            $(document).ready(function () {
                document.getElementById("submit").disabled = false; // Inicialmente deshabilita el botón de guardar
                // $('#rpuWarning').show(); // Ocultar advertencias de RPU
                $("#wrongFormatFile").modal("show"); //Muestra modal de advertencia
                $("#closaModal").click(function () {
                    $("#wrongFormatFile").modal("hide");
                    // $('#rpuWarning').show(); // Ocultar advertencias de RPU
                });
            });
            return
        }

        // rpusDuplicados = duplicateRpus();
        // console.log(rpusDuplicados)

        // FUNCIÓN PARA EXTRAER EL MES Y EL AÑO DEL ARCHIVO
        let monthAndYear = findMonthandYearNue(result);
        console.log("Month And Year", monthAndYear)


        let monthName = getMonthNameNue(monthAndYear[1]);


        console.log(monthName)
        monthAndYear.push(monthName)
        console.log(monthAndYear)

        const indexEncabezados = result.findIndex(numindexEncabezados => numindexEncabezados[0] === 'RPU');
        console.log(indexEncabezados)

        let encabezados = result[indexEncabezados]
        console.log(encabezados)
        encabezados.push(...extraDatesNue)
        finalDataArray.push(encabezados)
        // console.log("flag1")
        // return
        for (let i = indexEncabezados + 1; i < result.length; i++) {
            const element = result[i];
            // console.log(element[84])
            // fechaPorSeparado = FormattingDate(element[84])
            finalDataArray.push(element)
        }
        // console.log("flag2")
        // return
        for (let i = 1; i < finalDataArray.length; i++) {
            const element = finalDataArray[i];
            element.push(...monthAndYear);
            // console.log(element);
        }

        // console.log("flag3")
        for (let i = indexEncabezados + 1; i < result.length; i++) {
            const element = result[i];
            // console.log(element[84])
            // fechaPorSeparado = FormattingDate(element[84])

            let [dayD, monthD, yearD] = FormattingDate(element[84]);
            let [dayH, monthH, yearH] = FormattingDate(element[85]);
            let [dayP, monthP, yearP] = FormattingDate(element[86]);
            // console.log(fechaPorSeparado)

            element[84] = `${dayD}/${monthD}/${yearD}`;
            element[85] = `${dayH}/${monthH}/${yearH}`;

            element[86] = `${dayP}/${monthP}/${yearP}`;

            element.push(dayD, monthD, yearD, dayH, monthH, yearH)


            // finalDataArray.push(element)
        }


        // Primero, almacenamos todos los registros en arrayAPI
        finalDataArray.forEach((row, index) => {
            if (index > 0) { // Omitimos la fila de encabezados
                arrayAPI.push(row);
            }
        });

        console.log("FINAL", finalDataArray)
        // Ahora, renderizamos solo una muestra de los datos en la tabla


        // Por ejemplo, las primeras 100 filas
        const sampleSize = 10;
        const sampleDataArray = finalDataArray.slice(0, sampleSize + 1); // +1 para incluir los encabezados

        console.log("SAMPLE", sampleDataArray)

        sampleDataArray.forEach((row, index) => {
            loader.style.display = 'none';
            let table = document.getElementById('tbl-data');

            if (index == 0) {
                generateTableHeadersNue(table, row);
            } else {
                generateTableRowNue(table, row);
            }
        });
        // Actualizar solo el texto del div
        $('#message').text('Se muestran ' + (sampleDataArray.length - 1) + ' registros de ' + arrayAPI.length + '.');
        document.getElementById("submit").disabled = false; // Inicialmente deshabilita el botón de guardar
        console.log("ArrayAPi.length: " + arrayAPI.length, arrayAPI)


    }
}


