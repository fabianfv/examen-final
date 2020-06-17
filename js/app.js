class Ciudad {
  constructor(htmlNombre, htmlDifHoraria, htmlHoraLocal) {
    this.htmlNombre = htmlNombre
    this.htmlDifHoraria = htmlDifHoraria
    this.htmlHoraLocal = htmlHoraLocal
    this.horaMadrid = new Date()
  }

  get nombre() { return this.htmlNombre.textContent }
  get hora() { return this.htmlHoraLocal.textContent }
  get diferenciaHoraria() { return this.htmlDifHoraria.textContent }
  set nombre(nombre) { this._nombre = nombre }
  set diferenciaHoraria(difHoras) { this._difHoras = difHoras }

  escribirHoraEnDOM = () => {
    let horas = Number(new Date().getHours()) + Number(this._difHoras)
    let minutos = new Date().getMinutes()

    if (horas >= 24) { horas = Math.abs(horas - 24) }
    if (horas < 10) { horas = `0${horas}` }
    
    if (minutos < 10) { minutos = `0${minutos}` }

    this.htmlHoraLocal.textContent = `${horas}:${minutos}`
  }

  escribirNombreEnDOM(nombre) {
    this.htmlNombre.textContent = this._nombre
  }

  escribirDirerenciaHorariaEnDOM() {
    const horaMadrid = Number(this.horaMadrid.getHours())
    const difHoras = Number(this._difHoras)
    const horaCiudad = horaMadrid + difHoras

    const hoy_maniana = horaCiudad >= 24 ? "Mañana" : "Hoy"

    this.htmlDifHoraria.textContent = `${hoy_maniana}, ${difHoras < 0 ? "" : "+"}${difHoras}H`
  }
}

function crearCiudadesPredeterminadas() {
  const articles = Array.from(document.getElementsByTagName("article"))
  const ciudades = []

  for (article of articles) {
    const h3DifHoraria = article.firstElementChild.firstElementChild
    const h2Ciudad = h3DifHoraria.nextElementSibling
    const h1Hora = article.firstElementChild.nextElementSibling
    const ciudad = new Ciudad(h2Ciudad, h3DifHoraria, h1Hora)
    ciudades.push(ciudad)
  }

  return ciudades
}

const ciudades = crearCiudadesPredeterminadas()

const MA = ciudades[0]
const LD = ciudades[1]
const LA = ciudades[2]
const NY = ciudades[3]
const SD = ciudades[4]

MA.nombre = "Madrid"
MA.diferenciaHoraria = 0

LD.nombre = "Londres"
LD.diferenciaHoraria = -1

LA.nombre = "Los Ángeles"
LA.diferenciaHoraria = -9

NY.nombre = "Nueva York"
NY.diferenciaHoraria = -6

SD.nombre = "Sídney"
SD.diferenciaHoraria = 8

for (let ciudad of ciudades) {
  ciudad.escribirNombreEnDOM()
  ciudad.escribirHoraEnDOM()
  ciudad.escribirDirerenciaHorariaEnDOM()
  setInterval(ciudad.escribirHoraEnDOM, 1000)
}

/****************************************
 * Que el usuario pueda añadir ciudades *
 ****************************************/

document.getElementById("agregar-ciudad").addEventListener("click", agregarUnaCiudad)

/**
 * USUARIO AGREGA CIUDAD
 */

function usuarioAgregaCiudad() {
  const CANCELAR = null
  let entrada = false
  do {
    const mensaje =
      "Ingrese el nombre de una ciudad\n" +
      "y su diferencia horaria con Madrid\n" +
      "separándolos con coma, por ejemplo:\n" +
      "'Los Ángeles, -9'\n\n"
    entrada = prompt(mensaje)
    if (entrada === CANCELAR) return CANCELAR
    entrada = entrada.split(",").map((dato) => dato.trim())
    nombre = entrada[0]
    difHoraria = entrada[1]
    if (typeof nombre === "string" && difHoraria >= -24 && difHoraria <= 24) return entrada
  } while (true)
}

/**
 * 
 */

let nombreCiudad, diferenciaHoraria, h2Ciudad, h3DifHoraria, h1Hora

/**
 * CREAR HTML
 */
function crearEstructuraHTMLCiudad() {

  const main = document.getElementsByTagName("main")[0]
  const article = document.createElement("article")
  const section = document.createElement("section")

  h3DifHoraria = document.createElement("h3")
  h2Ciudad = document.createElement("h2")
  h1Hora = document.createElement("h1")

  section.appendChild(h3DifHoraria)
  section.appendChild(h2Ciudad)

  article.appendChild(section)
  article.appendChild(h1Hora)

  main.appendChild(article)

  estilizarCiudad(article, section)

  function estilizarCiudad() {
    article.className = "info-ciudad"
    section.className = "primer-bloque"
    h3DifHoraria.className = "diferencia-horaria"
    h2Ciudad.className = "ciudad"
    h1Hora.className = "hora"
  }
}

/**
 * PEDIR CIUDAD AL USUARIO
 */
function pedirCiudadAlUsuario() {
  const datos = usuarioAgregaCiudad()
  nombreCiudad = datos[0]
  diferenciaHoraria = datos[1]
}

/**
 * CREAR OBJETO CIUDAD
 */

function agregarUnaCiudad() {
  crearEstructuraHTMLCiudad()
  pedirCiudadAlUsuario()

  const ciudad = new Ciudad(h2Ciudad, h3DifHoraria, h1Hora)
  ciudad.nombre = nombreCiudad
  ciudad.diferenciaHoraria = diferenciaHoraria

  ciudad.escribirNombreEnDOM()
  ciudad.escribirHoraEnDOM()
  ciudad.escribirDirerenciaHorariaEnDOM()

  setInterval(ciudad.escribirHoraEnDOM, 1000)
}
