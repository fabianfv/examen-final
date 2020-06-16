class Ciudad {
  constructor(htmlNombre, htmlDifHoraria, htmlHoraLocal) {
    this.htmlNombre = htmlNombre
    this.htmlDifHoraria = htmlDifHoraria
    this.htmlHoraLocal = htmlHoraLocal
    this.horaMadrid = new Date()
  }

  get nombre() {
    return this.htmlNombre.textContent
  }

  get hora() {
    return this.htmlHoraLocal.textContent
  }

  get difHoraria() {
    return this.htmlDifHoraria.textContent
  }

  set nombre(nombre) {
    this._nombre = nombre
  }

  set diferenciaHoraria(difHoras) {
    this._difHoras = difHoras
  }

  escribirHoraEnDOM = () => {
    const hora = new Date().getHours() + this._difHoras
    const minutos = new Date().getMinutes()

    this.htmlHoraLocal.textContent = `${hora < 10 ? `0${hora}` : hora}:${minutos < 10 ? `0${minutos}` : minutos}`
  }


  escribirNombreEnDOM(nombre, difHoras) {
    this.htmlNombre.textContent = this._nombre
  }

  escribirDirerenciaHorariaEnDOM() {
    this.htmlDifHoraria.textContent = `${this._difHoras < 0 ? "" : "+"}${this._difHoras}H`
  }
}

function crearCiudadesPredeterminadas() {
  const articles = Array.from(document.getElementsByTagName("article"))
  const ciudades = []

  for (item of articles) {
    const h3DifHoraria = item.firstElementChild.firstElementChild
    const h2Ciudad = h3DifHoraria.nextElementSibling
    const h1Hora = item.firstElementChild.nextElementSibling
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

for (ciudad of ciudades) { 
  ciudad.escribirNombreEnDOM()
  ciudad.escribirHoraEnDOM()
  ciudad.escribirDirerenciaHorariaEnDOM()
  setInterval(ciudad.escribirHoraEnDOM, 1000)
}

