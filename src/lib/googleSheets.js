const { GoogleSpreadsheet } = require('google-spreadsheet')

// Crea una función asincrónica que lea un Google Sheet y devuelva un JSON dependiendo de la hoja que seleccione
async function leerGoogleSheet (key, hojaSeleccionada) {
  // Crea una instancia de GoogleSpreadsheet con la clave del Google Sheet
  const doc = new GoogleSpreadsheet(key)

  // Autentica con Google usando un archivo de credenciales (sustituye con tu propio archivo de credenciales)
  const credenciales = require('./credenciales.json')
  await doc.useServiceAccountAuth(credenciales)

  // Carga la información del Google Sheet
  await doc.loadInfo()

  // Obtiene la hoja seleccionada
  const hoja = doc.sheetsByTitle[hojaSeleccionada]

  // Obtiene los datos de la hoja como una matriz de objetos JSON
  const filas = await hoja.getRows()
  const datos = filas.map(fila => fila._rawData.reduce((obj, dato, indice) => {
    obj[hoja.headerValues[indice]] = dato
    return obj
  }, {}))

  // Devuelve los datos como un objeto JSON
  return datos
}

// Ejemplo de uso: lee un Google Sheet y devuelve los datos de la hoja "Ejemplo" como un objeto JSON
const key = 'clave_del_google_sheet'
const hojaSeleccionada = 'Ejemplo'
leerGoogleSheet(key, hojaSeleccionada)
  .then(datos => console.log(datos))
  .catch(error => console.error(error))
