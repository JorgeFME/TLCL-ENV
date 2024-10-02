function getVariableSize(variable) {
    const jsonString = JSON.stringify(variable);
    const bytes = new TextEncoder().encode(jsonString).length;
    return bytes;
}

async function nodeBulkService() {
    const loaderElement = document.getElementById('loader');
    const messageElement = document.getElementById('message');
    const submitButton = document.getElementById('submit');
    const inputFileElement = document.getElementById('inputFile');

    loaderElement.innerHTML = '<div style="margin-left: 15px;" margin-bottom: 12px;" class="spinner-grow text-danger" role="status"></div>';
    messageElement.innerHTML = '<div style="margin-left: 15px;">Insertando registros, espere por favor.</div>';
    submitButton.disabled = true;
    inputFileElement.disabled = true;

    console.log(arrayApi);
    console.log(fileType);


    // Ejemplo de uso
    const sizeInBytes = getVariableSize(arrayApi);
    console.log('Tamaño en bytes:', sizeInBytes);


    if (fileType == 'ERICSSON') {
        await postSiteEricsson(arrayApi);
    } else if (fileType == 'HUAWEI') {
        await postSiteHuawei(arrayApi);
    }
}

// Ruta POST para recibir los datos de Ericsson =================================================================================
// async function postSiteEricsson(data) {
//     try {
//         const maxAttempts = 5; // Número máximo de intentos
//         let currentAttempt = 1;
//         let response;

//         do {
//             response = await axios.post('http://localhost:3000/EricssonKpi', data);
//             console.log("Status: " + response.status);

//             if (response.status !== 201) {
//                 await new Promise((resolve) => setTimeout(resolve, 1000));
//                 currentAttempt++;
//             }
//         } while (response.status !== 201 && currentAttempt <= maxAttempts);

//         if (response.status === 201) {
//             console.log("Proceso terminado correctamente");
//             // Aquí puedes realizar acciones adicionales después de que el proceso haya terminado
//             alert("Se han cargado los datos")
//             setTimeout(() => {
//                 location.reload(); // Recargar la página después de 5 segundos
//             }, 5000);
//         } else {
//             alert("Ocurrió un error en la solicitud POST. Inténtalo de nuevo más tarde.");
//         }
//     } catch (error) {
//         console.log(error);
//         if (error.response && error.response.data) {
//             alert(error.response.data.error);
//         } else {
//             alert("Error en la solicitud POST");
//         }
//     }
// }





async function postSiteHuawei(data) {
    try {
        const maxAttempts = 5; // Número máximo de intentos
        let currentAttempt = 1;
        let response;

        do {
            response = await axios.post('https://demos-ee-multitenant-historicback.cfapps.us10.hana.ondemand.com/HuaweiKpi', data);
            console.log("Status: " + response.status);

            if (response.status !== 201) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                currentAttempt++;
            }
        } while (response.status !== 201 && currentAttempt <= maxAttempts);

        if (response.status === 201) {
            console.log("Proceso terminado correctamente");
            // Aquí puedes realizar acciones adicionales después de que el proceso haya terminado
            activateHuaweiFlow();
            alert("Se han cargado los datos")
            setTimeout(() => {
                location.reload(); // Recargar la página después de 5 segundos
            }, 5000);
        } else {
            alert("Ocurrió un error en la solicitud POST. Inténtalo de nuevo más tarde.");
        }
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            alert(error.response.data.error);
        } else {
            alert("Error en la solicitud POST");
        }
    }
}

// Ruta para correr el flujo de Huawei ======================================================================================

async function activateHuaweiFlow() {
    try {
        const response = await axios.post('https://global-hitss-app-dataintelligenceapi-srv.cfapps.us10.hana.ondemand.com/apiActivateFlow', {
            apiFlowName: "Carga KPI HUAWEI V2"
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
