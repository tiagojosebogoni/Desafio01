const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  // return res.send(`Bem Vindo, ${req.query.name}, ${req.query.idade}`)
  return res.render('start')
})

// middleware
const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/new', (req, res) => {
  return res.render('new')
})
app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  res.render('minor', { age })
})

app.get('/major', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  res.render('major', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
