function getFileData(e) {
    console.log('HTML Table: ', e);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let fechaSplit;
async function getTableData() {
    // console.log(globalArray);

    if ((document.getElementById("flexSwitch1").checked == true) || (document.getElementById("flexSwitch2").checked == true) ||
        (document.getElementById("flexSwitch3").checked == true) || (document.getElementById("flexSwitch4").checked == true)) {

        if (fechaSeleccionada == '') {
            alert("Seleccione la fecha de facturacion del archivo.")
            return;
        }

        loader = '<div style="margin-left: 15px;" margin-bottom: 12px;" class="spinner-grow text-danger" role="status"></div>'
        message = '<div style="margin-left: 15px;">Insertando registros, espere por favor.</div>'
        document.getElementById('loader').innerHTML = loader;
        document.getElementById('message').innerHTML = message;
        document.getElementById("submit").disabled = true;
        document.getElementById('inputFile').disabled = true;

        $("div:nth-child(2)").prop("disabled", true); // Deshabilitar el segundo div
        $("div:nth-child(2) *").prop("disabled", true); // Deshabilitar elementos interactivos dentro del segundo div

        console.log(fechaSeleccionada);

        $('#progress-bar-indicator').show();

        // Define la duración del ciclo for en número de iteraciones
        const duracion = globalArray.length;

        // Obtiene la barra de progreso
        const progress = document.querySelector('.progress-bar');

        // Define el valor inicial de la barra de progreso
        let valorActual = 0;

        // Define la función para actualizar la barra de progreso
        function actualizarProgreso() {
            // Calcula el porcentaje de progreso
            const porcentaje = (valorActual / duracion) * 100;
            // Actualiza la barra de progreso
            progress.style.width = `${porcentaje}%`;
            progress.setAttribute('aria-valuenow', porcentaje);
            progress.innerText = `${porcentaje.toFixed(2)}% completado`;
        }

        fechaSplit = fechaSeleccionada.split("-");

        let number = Number(fechaSplit[1]);


        let arrayAPILen = globalArray.length
        // console.log(globalArray);
        console.log(arrayAPILen);
        // console.log(fechaSplit[0]);
        // console.log(fechaSplit[1]);
        globalArray.map((row, index) => {
            // console.log(row);
            setTimeout(function () {
                // console.log(row); 
                if (index >= 0) {
                    var table = document.getElementById("tbl-data");
                    // console.log(row);
                    sendTableRowFact(row, globalArray.length, index, arrayAPILen, number)


                    // Incrementa el valor actual
                    valorActual += 1;
                    // Actualiza la barra de progreso
                    actualizarProgreso();
                    if (valorActual >= globalArray.length) {
                        progress.setAttribute('class', 'progress-bar progress-bar-striped progress-bar-animated bg-success');
                    }
                }
            }, index * 10.5)
        })
        // Marca el progreso como completado
        // progress.setAttribute('class', 'bg-success');
        progress.innerText = 'Completado';
        // const intervalID = setInterval(actualizarProgreso, intervalo);
    } else {
        alert("Seleccione un proveedor")
    }

}

// ======================================================================================================================

async function sendTableRowFact(data, realRegs, index, arrayLen, number) {
    await postSite(data, number).then(function (result) {
        if (index == (realRegs - 1)) {
            setTimeout(function () { alert("Se crearon correctamente " + (realRegs) + " registros de " + (arrayLen)) }, 500);
            activateFactFlow();
            // alert("Se crearon correctamente " + (realRegs) + " registros de " + (arrayLen));
            setTimeout(function () { location.reload() }, 9000);
        }
    })
}


// ===============================================================================================================
let counter = 0;
async function postSite(data, number) {
    // console.log(number);
    let SingleDateArr1 = data[7].split('/');
    let SingleDateArr2 = data[8].split('/');
    let provider = idProvider;
    try {
        const response = await axios.post('https://demos-ee-multitenant-dev-demo-ee-telcel-na-srv.cfapps.us10.hana.ondemand.com/temp-fact-cfe/TempFactCFE', {
            cl_rpu: typeof data[0] == 'number' ? data[0].toString() : data[0],

            cl_tarifa: typeof data[6] == 'number' ? data[6].toString() : data[6],

            anio_desde: SingleDateArr1[2].toString(),
            mes_desde: SingleDateArr1[1].replace(/^0+/, '').toString(),
            dia_desde: SingleDateArr1[0].toString(),

            anio_hasta: SingleDateArr2[2].toString(),
            mes_hasta: SingleDateArr2[1].replace(/^0+/, '').toString(),
            dia_hasta: SingleDateArr2[0].toString(),

            anio_fac: SingleDateArr2[2].toString(),
            mes_fac: SingleDateArr2[1].replace(/^0+/, '').toString(),

            anio_fac_enc: fechaSplit[0].toString(),
            mes_fac_enc: number.toString(),

            cons_resu: typeof data[9] === 'number' ? data[9] : Number(data[9]),
            demanda: typeof data[5] === 'number' ? data[5] : Number(data[5]),
            reactivos: typeof data[11] === 'number' ? data[11] : Number(data[11]),
            fac_pot: typeof data[12] === 'number' ? data[12] : Number(data[12]),

            // fac_car: typeof data[185] === 'string' ? data[185] = 0 : data[185] = data[185],
            fac_car: typeof data[13] === 'number' ? data[13] : Number(data[13]),
            im_energia: data[14],
            iva: parseInt(data[15], 0),

            im_dap: data[16],
            im_credito: data[17],
            im_total: data[18],
            id_proveedor: provider,

            dem_1p: typeof data[5] === 'number' ? data[5] : Number(data[5]),   //PUNTA
            dem_2p: typeof data[10] === 'number' ? data[10] : Number(data[10]),   //INTERMEDIA  

            cuenta: '',
            tipo_mov: '',
            cga_contr: null,
            im_bfp: null,
            im_bten: null,
            im_enertot: null,
            cons_1p: null,   //PUNTA
            cons_2p: null,   //INTERMEDIA
            cons_3p: null,   //BASE
            dem_3p: null,   //BASE
            id_division: null,
            RMU: '',
            id_proveedor: provider,
            tipo_archivo: 'REP4'

            // capacidad: data[59] < 1 ? data[59] = 0 : data[59] = data[59], //E Capacidad
            // distribucion: data[60] < 1 ? data[60] = 0 : data[60] = data[60], // Distribucion
        })
            .then(function (response) {
                // console.log(response);
                console.log("Status: " + response.status);
                counter += 1;

                // console.log(counter);

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error(error);
        alert(error.response.data.error);
    }
    // console.log(counter);
}

// Ruta para correr el flujo de Huawei ======================================================================================

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

