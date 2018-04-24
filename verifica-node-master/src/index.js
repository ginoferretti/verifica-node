import Api from './helpers/api'
import packageJson from '../package'

const apiUrl = 'http://192.168.1.231:8080'
const api = new Api(apiUrl)

const getEsUrl = id => `/esercizi/${id}`

const accreditamento = () => api.post('/accreditamento', {nome: packageJson.author})

const es1 = () => {
  const esercizio = getEsUrl(1)

  return api.get(esercizio)
    .then(({data}) => data.reduce((accumulator, value) => accumulator + value, 0))
}

const es2 = () => {
  const esercizio = getEsUrl(2)

  return api.get(esercizio)
    .then(({data}) => {
      const min = Math.min(...data)
      return data.map(value => value * min)
    })
}

const es3 = () => {
  const esercizio = getEsUrl(3)

  return api.get(esercizio)
    .then(({data}) => data.filter(value => value <= 3))
}

accreditamento()
  .then(() => Promise.all([
    es1(),
    es2(),
    es3()
  ]))
  .then(values => Promise.all(values.map((value, index) => {
    return api.post(getEsUrl(index + 1), { data: value })
  })))
  .then(console.log)
  .catch(console.log)