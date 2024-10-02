const monthList = [
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

const extraDates = [
    'Mes (String)',
    'Año',
    'Mes (number)',
];

const formatoAnterior = (result) => {


    if (result != undefined) {

        let flagFormato = checkFormat(result);
        // console.log(flagFormato)
        if (flagFormato == false) {
            console.log("Entra a checkformat")
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
        console.log(result)
        // rpusDuplicados = duplicateRpus();
        // console.log(rpusDuplicados)

        monthAndYear = findMonthandYear(result);
        console.log(monthAndYear);

        monthAndYear.push(getNumberOfMonth(monthAndYear[0]));
        console.log(monthAndYear)

        // Extrae los encabezados del archivo para la tablas
        const indexEncabezados = result.findIndex(numindexEncabezados => numindexEncabezados[0] === 'cl_rpu');
        console.log(indexEncabezados)


        encabezados = result[indexEncabezados] //La variable 'encabezados' es variable global y se encuentra en HTML
        encabezados.push(...extraDates)
        // console.log("Encabezados", encabezados)
        finalDataArray.push(encabezados) //La variable 'finalDataArray' es variable global y se encuentra en HTML

        for (let i = indexEncabezados + 1; i < result.length; i++) {
            const element = result[i];
            // console.log(element)
            finalDataArray.push(element)
        }

        for (let i = 1; i < finalDataArray.length; i++) {
            const element = finalDataArray[i];
            element.push(...monthAndYear);
            // console.log(element);
        }

        // console.log(finalDataArray)

        // triggerduplicateRPUs();

        // Primero, almacenamos todos los registros en arrayAPI
        finalDataArray.forEach((row, index) => {
            if (index > 0) { // Omitimos la fila de encabezados
                arrayAPI.push(row);
            }
        });

        console.log("FINAL: ", finalDataArray)
        console.log("ArrayApi: ", arrayAPI)

        // Por ejemplo, las primeras 100 filas
        const sampleSize = 10;
        const sampleDataArray = finalDataArray.slice(0, sampleSize + 1); // +1 para incluir los encabezados

        console.log("SAMPLE", sampleDataArray)

        sampleDataArray.forEach((row, index) => {
            loader.style.display = 'none';
            let table = document.getElementById('tbl-data');

            if (index == 0) {
                generateTableHead(table, row);
            } else {
                generateTableRow(table, row);
            }
        });

        // loader.style.display = 'none'; // Mostrar el indicador de carga
        // Actualizar solo el texto del div
        $('#message').text('Se muestran ' + (sampleDataArray.length - 1) + ' registros de ' + arrayAPI.length + '.');
        document.getElementById("submit").disabled = false; // Inicialmente deshabilita el botón de guardar
        console.log("arrayAPI", arrayAPI)

    }

}