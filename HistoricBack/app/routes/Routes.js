const express = require('express');
const router = express.Router();
const hana = require('@sap/hana-client');
const Bottleneck = require('bottleneck');

// Ruta de ejemplo
router.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta POST para recibir los datos de Ericsson =================================================================================
router.post('/EricssonKpi', async (req, res) => {
  try {
    const datos = req.body;
    console.log(datos[1]);
    console.log(datos[1].length);
    const tablaDestino = 'EC8992B291CB4FED92B61A15B3E856F1.GLOBALHITSS_EE_TEMPERICSSONKPI';

    if (!datos || !Array.isArray(datos) || datos.length === 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Realizar acciones con los datos recibidos y esperar a que se complete
    await insertarDesdeJson(datos, tablaDestino);

    // Enviar respuesta exitosa después de completar el proceso
    res.status(201).json({ mensaje: 'Datos recibidos correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});



// Ruta POST para recibir los datos de Huawei ======================================================================================
router.post('/HuaweiKpi', async (req, res) => {
  try {
    const datos = req.body;
    console.log(datos[1]);
    console.log(datos[1].length);
    const tablaDestino = 'EC8992B291CB4FED92B61A15B3E856F1.GLOBALHITSS_EE_TEMPHUAWEIKPI';

    if (!datos || !Array.isArray(datos) || datos.length === 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Realizar acciones con los datos recibidos y esperar a que se complete
    await insertarDesdeJson(datos, tablaDestino);

    // Enviar respuesta exitosa después de completar el proceso
    res.status(201).json({ mensaje: 'Datos recibidos correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

router.get('/HuaweiCounters', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta POST para recibir los datos de Counters de Huawei ======================================================================================
router.post('/HuaweiCounters', async (req, res) => {
  try {
    const datos = req.body;
    console.log(datos[1]);
    // return
    console.log(datos[1].length);
    const tablaDestino = 'EC8992B291CB4FED92B61A15B3E856F1.GLOBALHITSS_EE_TEMPHUAWEICOUNTERS';

    if (!datos || !Array.isArray(datos) || datos.length === 0) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Realizar acciones con los datos recibidos y esperar a que se complete
    await insertarDesdeJsonCounters(datos, tablaDestino);

    // Enviar respuesta exitosa después de completar el proceso
    res.status(201).json({ mensaje: 'Datos recibidos correctamente' });
  } catch (error) {
    // return
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});


// Proceso de inserción a la BD ==============================================================================================================================
const connOptions = {
  // Especificar la dirección y el puerto del servidor HANA
  serverNode: "c9e635f0-5ffb-477c-bf6c-b3447f00635c.hna0.prod-us10.hanacloud.ondemand.com:443",
  // Habilitar el cifrado de la conexión
  encrypt: true,
  // Especificar el proveedor de cifrado SSL
  sslCryptoProvider: "openssl",
  // Especificar el nombre de usuario
  uid: "EC8992B291CB4FED92B61A15B3E856F1_3F8YS0RT9BNVU2XJYLC0KCURV_RT",
  // Especificar la contraseña
  pwd: "Fb7_4zvF7wIrVQf5Du4nX_bO5uxyVH-6px42UK3IQROAvmO9nFDabLXPM2c8QQTB6TVVXMA3AIKPAxIuZgOF9_lPmJmtyt3y.xxA1JSUQOn1oGlj6SUwGEdWHGx3smp3",
};

// Definir las opciones de configuración del grupo de conexiones de base de datos
var poolProperties = {
  // Especificar el número máximo de conexiones que pueden estar disponibles en el grupo de conexiones de base de datos
  poolCapacity: 10,
  // Especificar el número máximo de conexiones que pueden estar abiertas al mismo tiempo
  maxConnectedOrPooled: 10000,
  // Especificar si se debe comprobar periódicamente el estado de las conexiones en el grupo
  pingCheck: false,
  // Especificar el tiempo máximo en segundos que una conexión puede estar inactiva antes de ser eliminada del grupo
  maxPooledIdleTime: 3600,
};

const combinedOptions = Object.assign({}, connOptions, poolProperties);

// Crear el grupo de conexiones con las opciones combinadas
const pool = hana.createPool(combinedOptions);

const limiter = new Bottleneck({
  minTime: 1000 / 15, // 5 solicitudes por segundo
});

// const archivoCSV = './ExcelCsv-Short.csv'; // Reemplaza con la ruta correcta a tu archivo CSV
// const tablaDestino = 'EC8992B291CB4FED92B61A15B3E856F1.GLOBALHITSS_EE_TEMPERICSSONKPI';
// const ordenColumnasQuery = ['FECHA', 'HORA', 'REGION', 'PROPIEDAD', 'ACCESIBILIDAD', 'RETENIBILIDAD', 'DL_THROUGHPUT', 'TOTAL_CELL_AVAILABILITY', 'TRAFFIC_DL', 'TRAFFIC_UL', 'UES', 'AVG_DL_PRB_USED'];
const ordenColumnasQuery = ['FECHA', 'HORA', 'REGION', 'PROPIEDAD', 'TRAFFIC_DL', 'TRAFFIC_UL', 'UES', 'AVG_DL_PRB_USED', 'ACCESIBILIDAD', 'DL_THROUGHPUT', 'TOTAL_CELL_AVAILABILITY', 'RETENIBILIDAD',];
//const ordenColumnasQueryHuaweiCounters = ['FECHA','BTSNAME','INTEGRITY','VSCELLDYNSHUTDOWN','LCHMEASDFEECARRIERDYNMUTINGTTI','LCHMEASDFEECARRIEROFF','LCHMEASDFEEOPPRFOFF','LCHMEASDFEERFOFF','LCHMEASDFEEPROACTIVESCHTTI','NPOWERSAVINGSYMBOLSHUTDOWN','NPOWERSAVINGRFSHUTDOWN','VSENERGYGSM_2G','VSENERGYUMTS_3G','VSENERGYLTE_4G','VSENERGYNR_5G']
const ordenColumnasQueryHuaweiCounters = ['FECHA','BTSNAME','INTEGRITY','VSENERGYGSM_2G','VSENERGYLTE_4G','VSENERGYNR_5G','VSENERGYUMTS_3G','VSCELLDYNSHUTDOWN','LCHMEASDFEECARRIERDYNMUTINGTTI','LCHMEASDFEECARRIEROFF','LCHMEASDFEEOPPRFOFF','LCHMEASDFEERFOFF','LCHMEASDFEEPROACTIVESCHTTI','NPOWERSAVINGSYMBOLSHUTDOWN','NPOWERSAVINGRFSHUTDOWN']

async function insertarDesdeJson(jsonData, tablaDestino) {
  try {
    const loteDatos = chunk(jsonData, 550);
    let exitoInsercion = true;

    for (const lote of loteDatos) {
      const insertQuery = generarInsertQuery(tablaDestino, lote, ordenColumnasQuery);
      console.log(insertQuery);
      await ejecutarQuery(insertQuery);
    }

    return exitoInsercion;
  } catch (error) {
    console.error("Error al insertar datos:", error);
    return false;
  }
}

async function insertarDesdeJsonCounters(jsonData, tablaDestino) {
  try {
    const loteDatos = chunk(jsonData, 550);
    let exitoInsercion = true;

    for (const lote of loteDatos) {
      const insertQuery = generarInsertQuery(tablaDestino, lote, ordenColumnasQueryHuaweiCounters);
      console.log(insertQuery);
      await ejecutarQuery(insertQuery);
    }

    return exitoInsercion;
  } catch (error) {
    console.error("Error al insertar datos:", error);
    return false;
  }
}


function chunk(arr, size) {
  var result = [];
  for (var i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}


async function ejecutarQuery(query) {
  try {
    const client = await pool.getConnection();
    try {
      await client.exec(query);
      console.log("Consulta INSERT ejecutada con éxito.");
    } finally {
      client.disconnect();
    }
  } catch (error) {
    console.error("Error al ejecutar la consulta INSERT:", error);
    throw error; // Lanzar una excepción en caso de error
  }
}


function generarInsertQuery(tabla, datos, ordenColumnas) {
  const columnas = ordenColumnas.map(columna => `"${columna}"`).join(', ');
  const filasInsert = datos.map(fila => {
    const valorFila = fila.map(valor => typeof valor === 'string' ? `'${valor}'` : valor).join(', ');
    return `SELECT ${valorFila} FROM DUMMY`;
  });
  const query = filasInsert.join(' UNION ALL\n');
  const finalQuery = `INSERT INTO ${tabla} (${columnas})\n${query};`;
  return finalQuery;
}





module.exports = router;
