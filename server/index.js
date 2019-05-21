import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import React from 'react'
import cors from 'cors';
import devMiddleware from './dev-middleware'
import { renderToString } from 'react-dom/server'
import apiRoute from './api-route';
import App from '../client/app.js'
import htmlPage from '../client/template.js'

const isProduction = process.env.NODE_ENV === 'production'
const app = express()
const PORT = 4000
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

if (!isProduction) {
  devMiddleware(app)
} else {
  app.use('/assets', express.static('dist'))
}

app.use(morgan('dev'))

app.get('/', function(req, res) {
  const initialPage = htmlPage(
    renderToString(<App />)
  )

  res.send(initialPage)
});

app.use('/api', apiRoute);

app.listen(PORT, () => console.log(`Express Server listening on ${PORT}`))
