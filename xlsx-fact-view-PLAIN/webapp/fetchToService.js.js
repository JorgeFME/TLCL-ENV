// Función para agregar un retraso
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Número máximo de peticiones simultáneas
const MAX_CONCURRENT_REQUESTS = 20;

// Función para manejar la lógica de procesamiento con concurrencia controlada
const saveInfo = async () => {
    console.log(arrayAPI);

    document.getElementById("submit").disabled = true;
    document.getElementById("openSelectionModalBtn").disabled = true;
    document.getElementById('excelFile').disabled = true;

    /***** Código de la barra de carga ******/
    $('#progress-bar-indicator').show();

    const duracion = arrayAPI.length; // Define la duración del ciclo for en número de iteraciones
    const progress = document.querySelector('.progress-bar'); // Obtiene la barra de progreso
    let valorActual = 0; // Define el valor inicial de la barra de progreso

    // Define la función para actualizar la barra de progreso
    function actualizarProgreso() {
        const porcentaje = (valorActual / duracion) * 100;
        progress.style.width = `${porcentaje}%`;
        progress.setAttribute('aria-valuenow', porcentaje);
        progress.innerText = `${porcentaje.toFixed(2)}% completado`;
    }

    // Función que procesa cada fila individualmente
    async function processRow(row, index) {
        // Incrementa el valor actual
        valorActual += 1;
        // Actualiza la barra de progreso
        await sendTableRow(row, 1, index, arrayAPI.length, index + 1, arrayAPI.length, 1, 1);
        actualizarProgreso();

        if (valorActual >= arrayAPI.length) {
            progress.setAttribute('class', 'progress-bar progress-bar-striped progress-bar-animated bg-success');
        }

    }

    // Procesar en lotes de acuerdo a MAX_CONCURRENT_REQUESTS
    async function processInBatches() {
        const queue = [...arrayAPI]; // Crea una cola de procesamiento

        while (queue.length > 0) {
            // Toma un lote de tamaño MAX_CONCURRENT_REQUESTS
            const batch = queue.splice(0, MAX_CONCURRENT_REQUESTS);

            // Ejecuta las peticiones en paralelo pero con límite de concurrencia
            await Promise.all(batch.map((row, index) => processRow(row, index)));

            // Agrega un pequeño retraso entre lotes para no sobrecargar el servidor
            await delay(1);  // Medio segundo de espera entre lotes
        }
    }

    // Inicia el procesamiento de lotes
    await processInBatches();

    // Espera 3 segundos (3000 milisegundos)
    await delay(2000);

    alert(`Total de registros creados correctamente: ${successCount}`);

    // Espera 3 segundos (3000 milisegundos)
    await delay(2000);

    alert("Por favor espere, la página se actualizará automáticamente al finalizar el proceso.");

    await activateFactFlow();

    // Si postData se ejecuta correctamente, espera 3 segundos y luego recarga la página.
    setTimeout(() => window.location.reload(), 6000);
};

// Función para enviar cada fila al servicio adecuado
async function sendTableRow(data, batchLength, index, arrayLength, totalProcessed, dataLength, batchNumber, currentBatchLength) {
    let result;
    if (selectedOption == 'version1') {
        result = await postSite(data);
    } else if (selectedOption == 'version2') {
        result = await postSiteNue(data);
    }

    if (result.success) {
        if (index === (arrayLength - 1)) {
            console.log(`Se crearon correctamente ${successCount} registros de ${arrayLength}`);
        }
    } else {
        alert(`Error en la petición: ${result.error} (Status: ${result.status})`);
    }
}




async function postSite(data) {
    try {
        if (data[213] < 1) {
            data[213] = data[213] * 100;
        }

        let integer = Number(data[10]);

        const response = await axios.post('https://demos-ee-multitenant-dev-demo-ee-telcel-na-srv.cfapps.us10.hana.ondemand.com/temp-fact-cfe/TempFactCFE', {
            cl_rpu: data[0].toString(),
            tipo_mov: data[2].toString(),
            cuenta: data[4],
            cl_tarifa: integer.toString(),
            anio_desde: data[13].toString(),
            mes_desde: data[14].toString(),
            dia_desde: data[15].toString(),
            anio_hasta: data[16].toString(),
            mes_hasta: data[17].toString(),
            dia_hasta: data[18].toString(),
            anio_fac: data[22].toString(),
            mes_fac: data[23].toString(),
            anio_fac_enc: data[216],
            mes_fac_enc: data[217],
            cons_resu: data[24],
            demanda: data[25],
            fac_pot: data[29],
            fac_car: typeof data[185] === 'string' ? 0 : data[185],
            cga_contr: data[26],
            reactivos: data[28],
            im_energia: data[33],
            im_bfp: data[35],
            im_bten: data[36],
            im_enertot: data[37],
            im_dap: data[39],
            im_total: data[40],
            im_credito: data[42],
            cons_1p: data[156],   //PUNTA
            cons_2p: data[157],   //INTERMEDIA
            cons_3p: data[158],   //BASE
            dem_1p: data[160],   //PUNTA
            dem_2p: data[161],   //INTERMEDIA
            dem_3p: data[162],   //BASE
            id_division: data[212],
            iva: parseInt(data[213], 0),
            RMU: data[214],
            id_proveedor: 'CFE',
            tipo_archivo: 'PLANO'
        });

        console.log("Estado de la petición:", response.status);
        successCount++; // Incrementar el contador en caso de éxito
        return { success: true, status: response.status, data: response.data };
    } catch (error) {
        console.log(error);
        console.log("RPU con error: " + data[0]);
        return { success: false, status: error.response?.status, error: error.message };
    }
}

async function postSiteNue(data) {
    try {
        if (data[213] < 1) {
            data[213] = data[213] * 100;
        }

        let integer = Number(data[231]);

        const response = await axios.post('https://demos-ee-multitenant-dev-demo-ee-telcel-na-srv.cfapps.us10.hana.ondemand.com/temp-fact-cfe/TempFactCFE', {
            cl_rpu: data[0].toString(),
            tipo_mov: data[2].toString(),
            cuenta: data[230],
            cl_tarifa: integer.toString(),

            anio_desde: data[256].toString(),
            mes_desde: data[255].toString(),
            dia_desde: data[254].toString(),

            anio_hasta: data[259].toString(),
            mes_hasta: data[258].toString(),
            dia_hasta: data[257].toString(),

            anio_fac: data[251].toString(),
            mes_fac: data[252].toString(),

            anio_fac_enc: data[251],
            mes_fac_enc: data[252],

            cons_resu: data[80],
            demanda: data[81],
            fac_pot: data[236],
            fac_car: typeof data[238] === 'string' ? 0 : data[238],
            cga_contr: data[234],
            reactivos: data[82],
            im_energia: data[75],
            im_bfp: data[77],
            im_bten: data[78],
            im_enertot: data[12],
            im_dap: data[14],
            im_total: data[8],
            im_credito: data[15],

            cons_1p: data[203],
            cons_2p: data[205],
            cons_3p: data[207],

            dem_1p: data[204],
            dem_2p: data[206],
            dem_3p: data[208],
            id_division: data[239],
            iva: parseInt(data[240], 0),
            RMU: data[241],
            id_proveedor: 'CFE',
            tipo_archivo: 'PLANO'
        });

        console.log("Estado de la petición:", response.status);
        successCount++; // Incrementar el contador en caso de éxito
        return { success: true, status: response.status, data: response.data };
    } catch (error) {
        console.log(error);
        console.log("RPU con error: " + data[0]);
        return { success: false, status: error.response?.status, error: error.message };
    }
}


async function activateFactFlow() {
    try {
        const response = await axios.post('https://cf-eedev-dataintelligenceapi.cfapps.us10.hana.ondemand.com/apiActivateVFlow', {
            apiVFlowName: "TLCL05_Carga_Datos_Facturacion_Electrica"
        });
        console.log(response);
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert('Error en la solicitud HTTP');
            }
        } else {
            alert('Error desconocido');
        }
    }
}