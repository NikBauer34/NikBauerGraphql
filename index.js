const express = require('express')
const mongoose = require('mongoose')
require('dotenv-flow').config()
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default
const root = require('./root.js')
const schema = require('./schema.js')
const app = express()
const start = () => {
  mongoose.connect('mongodb+srv://nikbauer09:9a10ur1Z@newcluster.csmi2qq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      //console.log('Database works')
    })
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => console.log(`The server works at ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`))
    })
    .catch(err => {
      //console.log('Error with the database occured, the server shut down')
      throw new Error(err)
    })
}
app.all('graphql', createHandler({schema, rootValue: root}))
app.get('/playground', expressPlayground({
  endpoint: '/graphql'
  })
);
start()